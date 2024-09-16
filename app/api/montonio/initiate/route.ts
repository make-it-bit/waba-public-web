import { NextResponse } from 'next/server';
import { Logger } from 'next-axiom';
import { getDatabase } from '@/lib/mongoClient';
import { ObjectId } from 'mongodb';

import jwt from 'jsonwebtoken';
import axios from 'axios';

import { getCountryCode } from 'countries-list';

type Order = {
  _id: ObjectId;
  montonioOrderId: string;
  montonioPaymentStatus: string;
  firstName: string;
  lastName: string;
  email: string;
  item: string;
  quantity: number;
  price: number;
  createdAt: Date;
};

const { BASE_URL, MONTONIO_ACCESS_KEY, MONTONIO_SECRET_KEY, MONTONIO_API_BASE_URL } = process.env;

export async function POST(req) {
  const log = new Logger();

  try {
    log.info('Received a request to initiate a Montonio payment.');

    if (!MONTONIO_ACCESS_KEY || !MONTONIO_SECRET_KEY || !MONTONIO_API_BASE_URL) {
      log.error('Missing Montonio credentials!');
      throw new Error('Missing Montonio credentials!');
    }

    const { firstName, lastName, email, address, city, region, country, postalCode, quantity } = await req.json();

    const payload = {
      accessKey: MONTONIO_ACCESS_KEY,
      merchantReference: `ORDER-${Math.floor(Math.random() * 1000000000).toString()}`,
      returnUrl: `${'https://development.wabaskin.com'}/payment-result`,
      notificationUrl: `${'https://development.wabaskin.com'}/payment-notification`,
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
        method: 'paymentInitiation',
        methodDisplay: 'Pay with your bank',
        methodOptions: {
          paymentDescription: 'PAYMENT FOR WABA ECLATIA',
          preferredCountry: '',
          preferredProvider: '',
        },
        amount: quantity * 962,
        currency: 'EUR',
      },
    };

    const token = jwt.sign(payload, MONTONIO_SECRET_KEY, { algorithm: 'HS256', expiresIn: '10m' });

    const response = await axios.post(`${MONTONIO_API_BASE_URL}/orders`, { data: token });
    if (!response.data) throw new Error('Failed to create checkout URL!');

    const mongoPayload: Order = {
      _id: new ObjectId(),
      montonioOrderId: response.data.uuid,
      montonioPaymentStatus: response.data.paymentStatus,
      firstName,
      lastName,
      email,
      item: 'WABA Eclatia',
      quantity,
      price: 962,
      createdAt: new Date(),
    };

    const db = await getDatabase();
    const orders = db.collection('orders');
    const insertResult = await orders.insertOne(mongoPayload);

    if (!insertResult.insertedId || !insertResult.acknowledged) {
      throw new Error('Failed to insert order into database!');
    }

    log.info('Montonio payment initiated successfully!', { paymentUrl: response.data.paymentUrl });
    await log.flush();
    return NextResponse.json({ data: { paymentUrl: response.data.paymentUrl } }, { status: 200 });
  } catch (error) {
    log.error('Failed to initiate Montonio payment!', { error });
    await log.flush();
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
