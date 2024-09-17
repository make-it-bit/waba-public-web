import { NextRequest, NextResponse } from 'next/server';
import { Logger } from 'next-axiom';
import { getDatabase } from '@/lib/mongoClient';
import { JwtPayload } from 'jsonwebtoken';
import { IncomingWebhook } from '@slack/webhook';

import { OrderStatusEnum } from '@/lib/enums';

import jwt from 'jsonwebtoken';

const { SLACK_ALERTS_WEBHOOK_URL, MONTONIO_SECRET_KEY, MONTONIO_ACCESS_KEY } = process.env;

export async function POST(req: NextRequest, context: any) {
  const { orderId } = context.params;
  const { orderToken: montonioOrderToken } = await req.json();

  const log = new Logger();

  let slack: IncomingWebhook | null = null;
  if (SLACK_ALERTS_WEBHOOK_URL) slack = new IncomingWebhook(SLACK_ALERTS_WEBHOOK_URL);

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
    const mongoDbOrder = await orders.findOne({ montonioOrderId: decoded.uuid });

    if (!mongoDbOrder) {
      log.error('Order not found in the database!', { montonioOrderId: decoded.uuid });
      throw new Error(`Order not found in the database (montonioOrderId: ${decoded.uuid})!`);
    }

    if (mongoDbOrder.montonioPaymentStatus === 'PAID') {
      log.info('Order already paid!', { montonioOrderId: decoded.uuid });
      return NextResponse.json({ data: { orderDetails: mongoDbOrder } }, { status: 200 });
    } else {
      if (decoded.uuid !== mongoDbOrder.montonioOrderId || decoded.accessKey !== MONTONIO_ACCESS_KEY) {
        log.error(
          `Mismatch between decoded uuid and mongodb order's montonioOrderId OR mismatch between decoded access key and MONTONIO_ACCESS_KEY (decoded: ${JSON.stringify(
            decoded
          )}, mongoDbOrder: ${JSON.stringify(mongoDbOrder)})!`
        );
        throw new Error(
          `Mismatch between decoded uuid and mongodb order's montonioOrderId OR mismatch between decoded access key and MONTONIO_ACCESS_KEY!`
        );
      }

      if (decoded.paymentStatus === OrderStatusEnum.PAID) {
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

        log.info('Montonio order validated successfully!', { orderDetails: updatedOrder });
        await log.flush();
        return NextResponse.json({ data: { orderDetails: updatedOrder } }, { status: 200 });
      } else {
        // still update the order with whatever status montonio payment has
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

        log.info('No unexpected errors, but payment not yet completed!', { montonioOrderId: decoded.uuid });
        return NextResponse.json({ data: { orderDetails: updatedOrder } }, { status: 200 });
      }
    }
  } catch (error) {
    log.error('Failed to validate Montonio order!', { error: error.message });
    if (slack) {
      await slack.send({ text: `Failed to validate Montonio order! ${error.message}` });
    }
    return NextResponse.json({ message: 'Failed to validate Montonio order!', error: error.message }, { status: 500 });
  }
}
