import React from 'react';
import Link from 'next/link';

import { Logger } from 'next-axiom';
import { getDatabase } from '@/lib/mongoClient';
import { ObjectId } from 'mongodb';

import type { Order } from '@/app/api/montonio/initiate/route';

// export async function generateMetadata() {
//   const orderResultData = await getPageData('order-result');
//   return {
//     title: orderResultData.attributes.seo?.title ?? '',
//     description: orderResultData.attributes.seo?.description ?? '',
//     alternates: {
//       canonical: '/orders/[orderId]',
//     },
//     openGraph: {
//       images: [
//         `/api/og?title=${orderResultData.attributes.seo?.title ?? ''}&desc=${
//           orderResultData.attributes.seo?.description ?? ''
//         }` || null,
//       ],
//     },
//   };
// }

async function getOrderDetailsFromMongoDB({ orderId }: { orderId: string }) {
  const log = new Logger();

  try {
    if (!orderId) {
      log.error('Missing order id! Cannot get order details from MongoDB!');
      throw new Error('Missing order id! Cannot get order details from MongoDB!');
    }

    const db = await getDatabase();
    const orders = db.collection('orders');
    const order = await orders.findOne({ _id: new ObjectId(orderId) });

    if (!order) {
      log.error('Order not found in the database! Cannot get order details from MongoDB!');
      throw new Error('Order not found in the database! Cannot get order details from MongoDB!');
    }

    return order as Order;
  } catch (error) {
    log.error('Failed to get order details from MongoDB!', { error });
    return { error: true };
  }
}

const Order = async ({ params }: { params: { orderId: string } }) => {
  const { orderId } = params;
  const orderDetails = await getOrderDetailsFromMongoDB({ orderId });

  if ('error' in orderDetails && orderDetails.error) {
    return (
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="md:col-start-3 col-start-1 md:col-span-8 col-span-12 md:mt-64 md:mb-64">
            <div className="flex flex-col gap-16 text-center">
              <h2 className="text-2xl">Failed to find order. Please try again later.</h2>
              <Link href="/product" className="text-reg underline">
                RETURN TO PRODUCT PAGE
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const typedOrderDetails = orderDetails as Order;

  return (
    <>
      <div className="bg-supplementary-warm-gray">
        <div className="container">
          <div className="grid grid-cols-12">
            <div className="sm:col-start-3 col-start-1 sm:col-span-8 col-span-12">
              <h1 className="font-rufina md:text-7xl text-5xl md:leading-7xl leading-5xl md:text-left text-center md:mt-176 mt-160 md:mb-40 mb-144">
                Wabaskin Order Result
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="grid grid-cols-12">
          <div className="lg:col-start-4 lg:col-span-6 col-span-12 md:mt-64 md:mb-128">
            <div className="flex flex-col">
              <div className="flex justify-between items-center border-b border-black-100 px-16 py-12">
                <p className="text-base leading-base">Order:</p>
                <p className="text-xs leading-xs">{typedOrderDetails.merchantReference}</p>
              </div>
              <div className="flex justify-between items-center border-b border-black-100 px-16 py-12">
                <p className="text-base leading-base">Payment status:</p>
                <p className="text-xs leading-xs">{typedOrderDetails.montonioPaymentStatus || ''}</p>
              </div>
              <div className="flex justify-between items-center border-b border-black-100 px-16 py-12">
                <p className="text-base leading-base">Total:</p>
                <p className="text-xs leading-xs">{typedOrderDetails.quantity * typedOrderDetails.price || ''}</p>
              </div>
              <div className="flex justify-between items-center border-b border-black-100 px-16 py-12">
                <p className="text-base leading-base">Name:</p>
                <p className="text-xs leading-xs">
                  {typedOrderDetails.billingAddress?.firstName || ''} {typedOrderDetails.billingAddress?.lastName || ''}
                </p>
              </div>
              <div className="flex justify-between items-center border-b border-black-100 px-16 py-12">
                <p className="text-base leading-base">Email:</p>
                <p className="text-xs leading-xs">{typedOrderDetails.billingAddress?.email}</p>
              </div>
              <div className="flex justify-between items-center border-b border-black-100 px-16 py-12">
                <p className="text-base leading-base">Address:</p>
                <p className="text-xs leading-xs">
                  {typedOrderDetails.billingAddress?.countryCode || ''} {typedOrderDetails.billingAddress?.region || ''}{' '}
                  {typedOrderDetails.billingAddress?.locality || ''} {typedOrderDetails.billingAddress?.address || ''}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
