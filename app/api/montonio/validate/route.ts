import { NextResponse } from 'next/server';
import { Logger } from 'next-axiom';
import { getDatabase } from '@/lib/mongoClient';
import { JwtPayload } from 'jsonwebtoken';

import jwt from 'jsonwebtoken';

const { MONTONIO_SECRET_KEY, MONTONIO_ACCESS_KEY } = process.env;

// TODO: lisada nii palju kui võimalik post to slacki
// TODO: lisada log flush

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const orderToken = searchParams.get('orderToken');

  const log = new Logger();

  try {
    log.info('Received a request to validate a Montonio payment.');

    if (!MONTONIO_SECRET_KEY || !MONTONIO_ACCESS_KEY) {
      log.error('Missing Montonio credentials!');
      throw new Error('Missing Montonio credentials!');
    }

    if (!orderToken) {
      log.error('Missing orderToken or montonioOrderId!');
      throw new Error('Missing orderToken or montonioOrderId!');
    }

    const decoded = jwt.verify(orderToken, MONTONIO_SECRET_KEY) as JwtPayload;

    //
    // IF PAID check also if paid in mongodb –> if so, return early with payload to render /orders/_id
    // otherwise, check if mongo montonioOrderId and decoded montonioOrderId match and then update the order in mongo
    //

    if (
      decoded.paymentStatus === 'PAID' /* && decoded.uuid === montonioOrderId */ &&
      decoded.accessKey === MONTONIO_ACCESS_KEY
    ) {
      log.info('Montonio order validated successfully!', { decoded });

      const db = await getDatabase();
      const orders = db.collection('orders');
      const order = await orders.findOne({ montonioOrderId: decoded.montonioOrderId });

      if (!order) {
        log.error('Order not found in the database!', { decoded });
        return NextResponse.json({ message: 'Order not found!' }, { status: 404 });
      }

      const updateResult = await orders.updateOne(
        { montonioOrderId: decoded.uuid },
        { $set: { montonioPaymentStatus: decoded.paymentStatus } }
      );
      if (!updateResult.acknowledged) throw new Error('Failed to update order!');
      else if (updateResult.modifiedCount === 0) throw new Error('Nothing was updated (order)!');

      return NextResponse.json({ data: { orderData: decoded } }, { status: 200 });
    } else {
      log.error('Failed to validate Montonio order!', { decoded });
      return NextResponse.json(
        { message: 'Failed to validate Montonio order!', error: 'Order validation failed!' },
        { status: 400 }
      );
    }
  } catch (error) {
    log.error('Failed to validate Montonio order!', { error: error.message });
    return NextResponse.json({ message: 'Failed to validate Montonio order!', error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  const { orderToken } = req.body;

  const log = new Logger();

  try {
    log.info('Received a request to validate a Montonio payment.');

    if (!MONTONIO_SECRET_KEY || !MONTONIO_ACCESS_KEY) {
      log.error('Missing Montonio credentials!');
      throw new Error('Missing Montonio credentials!');
    }

    if (!orderToken) {
      log.error('Missing orderToken or montonioOrderId!');
      throw new Error('Missing orderToken or montonioOrderId!');
    }

    const decoded = jwt.verify(orderToken, MONTONIO_SECRET_KEY) as JwtPayload;

    if (
      decoded.paymentStatus === 'PAID' /* && decoded.uuid === montonioOrderId */ &&
      decoded.accessKey === MONTONIO_ACCESS_KEY
    ) {
      log.info('Montonio order validated successfully!', { decoded });

      const db = await getDatabase();
      const orders = db.collection('orders');
      const order = await orders.findOne({ montonioOrderId: decoded.montonioOrderId });

      if (!order) {
        log.error('Order not found in the database!', { decoded });
        return NextResponse.json({ message: 'Order not found!' }, { status: 404 });
      }

      const updateResult = await orders.updateOne(
        { montonioOrderId: decoded.uuid },
        { $set: { montonioPaymentStatus: decoded.paymentStatus } }
      );
      if (!updateResult.acknowledged) throw new Error('Failed to update order!');
      else if (updateResult.modifiedCount === 0) throw new Error('Nothing was updated (order)!');

      return NextResponse.json({ data: { orderData: decoded } }, { status: 200 });
    } else {
      log.error('Failed to validate Montonio order!', { decoded });
      return NextResponse.json(
        { message: 'Failed to validate Montonio order!', error: 'Order validation failed!' },
        { status: 400 }
      );
    }
  } catch (error) {
    log.error('Failed to validate Montonio order!', { error: error.message });
    return NextResponse.json({ message: 'Failed to validate Montonio order!', error: error.message }, { status: 500 });
  }
}
