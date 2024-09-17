import { NextRequest, NextResponse } from 'next/server';
import { Logger } from 'next-axiom';
import { getDatabase } from '@/lib/mongoClient';
import { IncomingWebhook } from '@slack/webhook';

const { SLACK_ALERTS_WEBHOOK_URL } = process.env;

export async function GET(req: NextRequest, context: any) {
  const { orderId } = context.params;

  const log = new Logger();

  let slack: IncomingWebhook | null = null;
  if (SLACK_ALERTS_WEBHOOK_URL) slack = new IncomingWebhook(SLACK_ALERTS_WEBHOOK_URL);

  if (!orderId) {
    log.error('Missing order id!');
    if (slack) {
      await slack.send({ text: 'Failed to get order from the database! Missing order id!' });
    }
    throw new Error('Missing order id!');
  }

  const db = await getDatabase();
  const orders = db.collection('orders');
  const order = await orders.findOne({ _id: orderId });

  if (!order) {
    log.error('Order not found in the database!', { orderId });
    if (slack) {
      await slack.send({ text: `Order not found in the database! orderId: ${orderId}` });
    }
    return NextResponse.json({ message: 'Order not found in the database!' }, { status: 404 });
  }

  await log.flush();
  return NextResponse.json({ data: { orderDetails: order } }, { status: 200 });
}
