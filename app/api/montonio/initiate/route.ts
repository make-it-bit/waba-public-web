import { NextResponse } from 'next/server';
import { Logger } from 'next-axiom';
import { getDatabase } from '@/lib/mongoClient';
import { ObjectId } from 'mongodb';
import { getCountryCode } from 'countries-list';
import { IncomingWebhook } from '@slack/webhook';

import jwt from 'jsonwebtoken';
import axios from 'axios';

import { payingInPartsValidation, paymentFormValidation } from '@/utils/formValidation';
import { PaymentMethodEnum } from '@/components/CheckoutButton/CheckoutButton';

type Order = {
  _id: ObjectId;
  montonioOrderId: string;
  montonioPaymentStatus: string;
  billingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    locality: string;
    region: string;
    countryCode: string;
    postalCode: string;
  };
  shippingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    locality: string;
    region: string;
    countryCode: string;
    postalCode: string;
  };
  item: string;
  quantity: number;
  price: number;
  createdAt: Date;
};

const { BASE_URL, SLACK_ALERTS_WEBHOOK_URL, MONTONIO_ACCESS_KEY, MONTONIO_SECRET_KEY, MONTONIO_API_BASE_URL } =
  process.env;

export async function POST(req) {
  const log = new Logger();

  let slack: IncomingWebhook | null = null;
  if (SLACK_ALERTS_WEBHOOK_URL) slack = new IncomingWebhook(SLACK_ALERTS_WEBHOOK_URL);

  try {
    log.info('Received a request to initiate a Montonio payment.');

    if (!MONTONIO_ACCESS_KEY || !MONTONIO_SECRET_KEY || !MONTONIO_API_BASE_URL) {
      log.error('Missing Montonio credentials!');
      if (slack) {
        await slack.send({ text: 'Failed to initiate Montonio payment! Missing Montonio credentials!' });
      }
      throw new Error('Missing Montonio credentials!');
    }

    const { firstName, lastName, email, address, city, region, country, postalCode, quantity, paymentMethod, period } =
      await req.json();

    const payingInPartsError = payingInPartsValidation(quantity * 962, paymentMethod, period);
    if (payingInPartsError) {
      log.error('Invalid payment form data!', { payingInPartsError });
      if (slack) {
        await slack.send({
          text: `Failed to initiate Montonio payment! Invalid payment form data! payingInPartsError: ${JSON.stringify(
            payingInPartsError
          )}`,
        });
      }
      return NextResponse.json(
        { message: 'Invalid payment form data!', errors: { period: payingInPartsError } },
        { status: 400 }
      );
    }
    const paymentFormErrors = paymentFormValidation(
      {
        firstName,
        lastName,
        email,
        address,
        city,
        region,
        country,
        postalCode,
        quantity,
        period,
      },
      paymentMethod
    );
    if (Object.keys(paymentFormErrors).length > 0) {
      log.error('Invalid payment form data!', { paymentFormErrors });
      if (slack) {
        await slack.send({
          text: `Failed to initiate Montonio payment! Invalid payment form data! paymentFormErrors: ${JSON.stringify(
            paymentFormErrors
          )}`,
        });
      }
      return NextResponse.json({ message: 'Invalid payment form data!', errors: paymentFormErrors }, { status: 400 });
    }

    const mongoPayload: Order = {
      _id: new ObjectId(),
      montonioOrderId: '',
      montonioPaymentStatus: 'not started',
      billingAddress: {
        firstName,
        lastName,
        email,
        address,
        locality: city,
        region,
        countryCode: getCountryCode(country) as string,
        postalCode,
      },
      shippingAddress: {
        firstName,
        lastName,
        email,
        address,
        locality: city,
        region,
        countryCode: getCountryCode(country) as string,
        postalCode,
      },
      item: 'WABA Eclatia',
      quantity,
      price: 962,
      createdAt: new Date(),
    };

    const db = await getDatabase();
    const orders = db.collection('orders');
    const insertResult = await orders.insertOne(mongoPayload);

    if (!insertResult.insertedId || !insertResult.acknowledged) {
      if (slack) {
        await slack.send({
          text: `Failed to insert order into database! mongoPayload: ${JSON.stringify(mongoPayload)}`,
        });
      }
      throw new Error('Failed to insert order into database!');
    }

    const payload = {
      accessKey: MONTONIO_ACCESS_KEY,
      merchantReference: `ORDER-${Math.floor(Math.random() * 1000000000).toString()}`,
      returnUrl: `${BASE_URL}/orders/${insertResult.insertedId}`,
      notificationUrl: `${BASE_URL}/api/orders/${insertResult.insertedId}/validate`,
      currency: 'EUR',
      grandTotal: quantity * 962,
      locale: 'en',
      billingAddress: {
        firstName,
        lastName,
        email,
        addressLine1: address,
        locality: city,
        region,
        country: getCountryCode(country),
        postalCode,
      },
      shippingAddress: {
        firstName,
        lastName,
        email,
        addressLine1: address,
        locality: city,
        region,
        country: getCountryCode(country),
        postalCode,
      },
      lineItems: [{ name: 'WABA Eclatia', quantity, finalPrice: 962 }],
      payment: {
        method: paymentMethod,
        methodOptions: {
          ...(paymentMethod === 'paymentInitiation' /* PaymentMethodEnum.PAYMENT_INITIATION */ && {
            preferredProvider: '',
          }),
          ...(paymentMethod === 'cardPayments' /* PaymentMethodEnum.CARD_PAYMENTS */ && { preferredMethod: 'wallet' }),
          ...(paymentMethod === 'hirePurchase' /* PaymentMethodEnum.HIRE_PURCHASE */ && {}),
          ...(paymentMethod === 'bnpl' /* PaymentMethodEnum.BNPL */ && { period }),
        },
        amount: quantity * 962,
        currency: 'EUR',
      },
    };

    const token = jwt.sign(payload, MONTONIO_SECRET_KEY, { algorithm: 'HS256', expiresIn: '10m' });
    if (!token) {
      if (slack) {
        await slack.send({ text: `Failed to create token! payload: ${JSON.stringify(payload)}` });
      }
      throw new Error('Failed to create token!');
    }

    const response = await axios.post(`${MONTONIO_API_BASE_URL}/orders`, { data: token });
    if (!response.data?.uuid || !response.data?.paymentStatus || !response.data?.paymentUrl) {
      if (slack) {
        await slack.send({ text: `Failed to create checkout URL! response: ${JSON.stringify(response)}` });
      }
      throw new Error('Failed to create checkout URL!');
    }

    const updateResult = await orders.updateOne(
      { _id: insertResult.insertedId },
      { $set: { montonioOrderId: response.data.uuid, montonioPaymentStatus: response.data.paymentStatus } }
    );
    if (!updateResult.acknowledged) {
      if (slack) {
        await slack.send({ text: `Failed to update order in database! updateResult: ${JSON.stringify(updateResult)}` });
      }
      throw new Error('Failed to update order in database!');
    } else if (updateResult.modifiedCount === 0) {
      if (slack) {
        await slack.send({
          text: `Nothing was updated in the database (order)! updateResult: ${JSON.stringify(updateResult)}`,
        });
      }
      throw new Error('Nothing was updated in the database (order)!');
    }

    log.info('Montonio payment initiated successfully!', { paymentUrl: response.data.paymentUrl });
    await log.flush();
    return NextResponse.json({ data: { paymentUrl: response.data.paymentUrl } }, { status: 200 });
  } catch (error) {
    log.error('Failed to initiate Montonio payment!', { error });
    await log.flush();
    if (slack) {
      await slack.send({ text: `Failed to initiate Montonio payment! error: ${error}` });
    }
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
