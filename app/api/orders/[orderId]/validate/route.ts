import { NextRequest, NextResponse } from 'next/server';
import { Logger } from 'next-axiom';
import { getDatabase } from '@/lib/mongoClient';
import { JwtPayload } from 'jsonwebtoken';
import { IncomingWebhook } from '@slack/webhook';

import jwt from 'jsonwebtoken';

const { SLACK_ALERTS_WEBHOOK_URL, MONTONIO_SECRET_KEY, MONTONIO_ACCESS_KEY } = process.env;

let slack: IncomingWebhook | null = null;
if (SLACK_ALERTS_WEBHOOK_URL) slack = new IncomingWebhook(SLACK_ALERTS_WEBHOOK_URL);

export async function GET(req: NextRequest, context: any) {
  const { orderId } = context.params;

  const { searchParams } = new URL(req.url);
  const montonioOrderToken = searchParams.get('montonioOrderToken');

  const log = new Logger();

  try {
    log.info('Received a request to validate a Montonio payment.');

    if (!MONTONIO_SECRET_KEY || !MONTONIO_ACCESS_KEY) {
      log.error('Missing Montonio credentials!');
      if (slack) {
        await slack.send({ text: 'Failed to initiate Montonio payment! Missing Montonio credentials!' });
      }
      throw new Error('Missing Montonio credentials!');
    }

    if (!orderId || !montonioOrderToken) {
      log.error('Missing order id or order token!', { orderId, montonioOrderToken });
      if (slack) {
        await slack.send({ text: 'Failed to validate Montonio payment! Missing order id or order token!' });
      }
      throw new Error('Missing order id or order token!');
    }

    const decoded = jwt.verify(montonioOrderToken, MONTONIO_SECRET_KEY) as JwtPayload;
    if (!decoded.uuid) {
      log.error('Failed to decode Montonio order token!', { montonioOrderToken });
      if (slack) {
        await slack.send({ text: `Failed to decode Montonio order token! montonioOrderToken: ${montonioOrderToken}` });
      }
      throw new Error('Failed to decode Montonio order token!');
    }

    const db = await getDatabase();
    const orders = db.collection('orders');
    const order = await orders.findOne({ montonioOrderId: decoded.uuid });

    if (!order) {
      log.error('Order not found in the database!', { montonioOrderId: decoded.uuid });
      if (slack) {
        await slack.send({ text: `Order not found in the database! montonioOrderId: ${decoded.uuid}` });
      }
      return NextResponse.json({ message: 'Order not found in the database!' }, { status: 404 });
    }

    if (order.montonioPaymentStatus === 'PAID') {
      log.info('Order already paid!', { montonioOrderId: decoded.uuid });
      return NextResponse.json(
        { data: { orderDetails: { ...order, merchantReference: decoded.merchantReferenceDisplay } } },
        { status: 200 }
      );
    } else {
      if (decoded.uuid !== order.montonioOrderId || decoded.accessKey !== MONTONIO_ACCESS_KEY) {
        log.error('Order not found in the database! Failed to validate Montonio order!', {
          montonioOrderIdInDb: order.montonioOrderId,
          montonioOrderIdDecoded: decoded.uuid,
        });
        if (slack) {
          await slack.send({
            text: `Order not found in the database! montonioOrderIdInDb: ${order.montonioOrderId}, montonioOrderIdDecoded: ${decoded.uuid}`,
          });
        }
        return NextResponse.json({ message: 'Order not found!' }, { status: 404 });
      }

      const updateResult = await orders.updateOne(
        { montonioOrderId: decoded.uuid },
        { $set: { montonioPaymentStatus: decoded.paymentStatus } }
      );
      if (!updateResult.acknowledged) {
        if (slack) {
          await slack.send({
            text: `Failed to update order in database! updateResult: ${JSON.stringify(updateResult)}`,
          });
        }
        throw new Error('Failed to update order!');
      } else if (updateResult.modifiedCount === 0) {
        if (slack) {
          await slack.send({
            text: `Nothing was updated in the database (order)! updateResult: ${JSON.stringify(updateResult)}`,
          });
        }
        throw new Error('Nothing was updated (order)!');
      }

      const updatedOrder = await orders.findOne({ montonioOrderId: decoded.uuid });

      log.info('Montonio order validated successfully!', {
        orderDetails: { ...updatedOrder, merchantReference: decoded.merchantReferenceDisplay },
      });
      await log.flush();
      return NextResponse.json(
        { data: { orderDetails: { ...updatedOrder, merchantReference: decoded.merchantReferenceDisplay } } },
        { status: 200 }
      );
    }
  } catch (error) {
    log.error('Failed to validate Montonio order!', { error: error.message });
    if (slack) {
      await slack.send({ text: `Failed to validate Montonio order! error: ${error.message}` });
    }
    return NextResponse.json({ message: 'Failed to validate Montonio order!', error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest, context: any) {
  const { orderId } = context.params;
  const { montonioOrderToken } = await req.json();

  const log = new Logger();

  try {
    log.info('Received a request to validate a Montonio payment.');

    if (!MONTONIO_SECRET_KEY || !MONTONIO_ACCESS_KEY) {
      log.error('Missing Montonio credentials!');
      if (slack) {
        await slack.send({ text: 'Failed to initiate Montonio payment! Missing Montonio credentials!' });
      }
      throw new Error('Missing Montonio credentials!');
    }

    if (!orderId || !montonioOrderToken) {
      log.error('Missing order id or order token!', { orderId, montonioOrderToken });
      if (slack) {
        await slack.send({ text: 'Failed to validate Montonio payment! Missing order id or order token!' });
      }
      throw new Error('Missing order id or order token!');
    }

    const decoded = jwt.verify(montonioOrderToken, MONTONIO_SECRET_KEY) as JwtPayload;
    if (!decoded.uuid) {
      log.error('Failed to decode Montonio order token!', { montonioOrderToken });
      if (slack) {
        await slack.send({ text: `Failed to decode Montonio order token! montonioOrderToken: ${montonioOrderToken}` });
      }
      throw new Error('Failed to decode Montonio order token!');
    }

    const db = await getDatabase();
    const orders = db.collection('orders');
    const order = await orders.findOne({ montonioOrderId: decoded.uuid });

    if (!order) {
      log.error('Order not found in the database!', { montonioOrderId: decoded.uuid });
      if (slack) {
        await slack.send({ text: `Order not found in the database! montonioOrderId: ${decoded.uuid}` });
      }
      return NextResponse.json({ message: 'Order not found in the database!' }, { status: 404 });
    }

    if (order.montonioPaymentStatus === 'PAID') {
      log.info('Order already paid!', { montonioOrderId: decoded.uuid });
      return NextResponse.json(
        { data: { orderDetails: { ...order, merchantReference: decoded.merchantReferenceDisplay } } },
        { status: 200 }
      );
    } else {
      if (decoded.uuid !== order.montonioOrderId || decoded.accessKey !== MONTONIO_ACCESS_KEY) {
        log.error('Order not found in the database! Failed to validate Montonio order!', {
          montonioOrderIdInDb: order.montonioOrderId,
          montonioOrderIdDecoded: decoded.uuid,
        });
        if (slack) {
          await slack.send({
            text: `Order not found in the database! montonioOrderIdInDb: ${order.montonioOrderId}, montonioOrderIdDecoded: ${decoded.uuid}`,
          });
        }
        return NextResponse.json({ message: 'Order not found!' }, { status: 404 });
      }

      const updateResult = await orders.updateOne(
        { montonioOrderId: decoded.uuid },
        { $set: { montonioPaymentStatus: decoded.paymentStatus } }
      );
      if (!updateResult.acknowledged) {
        if (slack) {
          await slack.send({
            text: `Failed to update order in database! updateResult: ${JSON.stringify(updateResult)}`,
          });
        }
        throw new Error('Failed to update order!');
      } else if (updateResult.modifiedCount === 0) {
        if (slack) {
          await slack.send({
            text: `Nothing was updated in the database (order)! updateResult: ${JSON.stringify(updateResult)}`,
          });
        }
        throw new Error('Nothing was updated (order)!');
      }

      const updatedOrder = await orders.findOne({ montonioOrderId: decoded.uuid });

      log.info('Montonio order validated successfully!', {
        orderDetails: { ...updatedOrder, merchantReference: decoded.merchantReferenceDisplay },
      });
      await log.flush();
      return NextResponse.json(
        { data: { orderDetails: { ...updatedOrder, merchantReference: decoded.merchantReferenceDisplay } } },
        { status: 200 }
      );
    }
  } catch (error) {
    log.error('Failed to validate Montonio order!', { error: error.message });
    if (slack) {
      await slack.send({ text: `Failed to validate Montonio order! error: ${error.message}` });
    }
    return NextResponse.json({ message: 'Failed to validate Montonio order!', error: error.message }, { status: 500 });
  }
}
