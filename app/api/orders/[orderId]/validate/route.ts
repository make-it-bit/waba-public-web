import { NextRequest, NextResponse } from 'next/server';
import { Logger } from 'next-axiom';
import { getDatabase } from '@/lib/mongoClient';
import { JwtPayload } from 'jsonwebtoken';
import { IncomingWebhook } from '@slack/webhook';

import jwt from 'jsonwebtoken';

const { SLACK_ALERTS_WEBHOOK_URL, MONTONIO_SECRET_KEY, MONTONIO_ACCESS_KEY } = process.env;

let slack: IncomingWebhook | null = null;
if (SLACK_ALERTS_WEBHOOK_URL) slack = new IncomingWebhook(SLACK_ALERTS_WEBHOOK_URL);

export async function POST(req: NextRequest, context: any) {
  const { orderId } = context.params;
  const { montonioOrderToken } = await req.json();

  const log = new Logger();

  try {
    log.info('Received a request to validate a Montonio payment.');

    if (!MONTONIO_SECRET_KEY || !MONTONIO_ACCESS_KEY) {
      log.error('Missing Montonio credentials!');
      throw new Error('Missing Montonio credentials!');
    }

    if (!orderId || !montonioOrderToken) {
      log.error('Missing order id or order token!');
      throw new Error('Missing order id or order token!');
    }

    const decoded = jwt.verify(montonioOrderToken, MONTONIO_SECRET_KEY) as JwtPayload;
    if (!decoded.uuid) {
      log.error('Failed to decode Montonio order token!', { montonioOrderToken });
      throw new Error(`Failed to decode Montonio order token (montonioOrderToken: ${montonioOrderToken})!`);
    }

    const db = await getDatabase();
    const orders = db.collection('orders');
    const order = await orders.findOne({ montonioOrderId: decoded.uuid }); // TODO: mongodbOrder

    if (!order) {
      log.error('Order not found in the database!', { montonioOrderId: decoded.uuid });
      throw new Error(`Order not found in the database (montonioOrderId: ${decoded.uuid})!`);
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
          // TODO: vale sõnum
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

      // IF decoded.paymentStatus === 'PAID' THEN update order in database and say success
      // ELSE say something like "no unexpected errors, but payment not yet completed"

      const updateResult = await orders.updateOne(
        { montonioOrderId: decoded.uuid },
        { $set: { montonioPaymentStatus: decoded.paymentStatus } }
      );
      if (!updateResult.acknowledged) {
        throw new Error(`Failed to update order in database (updateResult: ${JSON.stringify(updateResult)})!`);
      } else if (updateResult.modifiedCount === 0) {
        throw new Error(`Nothing was updated in the database (updateResult: ${JSON.stringify(updateResult)})!`);
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
      await slack.send({ text: `Failed to validate Montonio order! ${error.message}` });
    }
    return NextResponse.json({ message: 'Failed to validate Montonio order!', error: error.message }, { status: 500 });
  }
}
