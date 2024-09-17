import React from 'react';
import Link from 'next/link';
import { Logger } from 'next-axiom';
import { getDatabase } from '@/lib/mongoClient';
import { ObjectId } from 'mongodb';

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
  if (!orderId) {
    throw new Error('Missing order id!');
  }

  const db = await getDatabase();
  const orders = db.collection('orders');
  const order = await orders.findOne({ _id: new ObjectId(orderId) });

  if (!order) throw new Error('Order not found in the database!');

  return order;
}

const Order = async ({ params }: { params: { orderId: string } }) => {
  const { orderId } = params;
  const orderDetails = await getOrderDetailsFromMongoDB({ orderId });

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
          {!orderDetails.error ? (
            <div className="lg:col-start-4 lg:col-span-6 col-span-12 md:mt-64 md:mb-64">
              <div className="flex flex-col">
                <div className="flex justify-between items-center border-b border-black-100 px-16 py-12">
                  <p className="text-base leading-base">merchantReferenceDisplay:</p>
                  <p className="text-xs leading-xs">{orderDetails?.merchantReference || ''}</p>
                </div>
                <div className="flex justify-between items-center border-b border-black-100 px-16 py-12">
                  <p className="text-base leading-base">paymentStatus:</p>
                  <p className="text-xs leading-xs">{orderDetails?.montonioPaymentStatus || ''}</p>
                </div>
                <div className="flex justify-between items-center border-b border-black-100 px-16 py-12">
                  <p className="text-base leading-base">grandTotal:</p>
                  <p className="text-xs leading-xs">{orderDetails?.quantity * orderDetails?.price || ''}</p>
                </div>
                <div className="flex justify-between items-center border-b border-black-100 px-16 py-12">
                  <p className="text-base leading-base">name:</p>
                  <p className="text-xs leading-xs">
                    {orderDetails?.billingAddress?.firstName || ''} {orderDetails?.billingAddress?.lastName || ''}
                  </p>
                </div>
                <div className="flex justify-between items-center border-b border-black-100 px-16 py-12">
                  <p className="text-base leading-base">email:</p>
                  <p className="text-xs leading-xs">{orderDetails?.billingAddress?.email}</p>
                </div>
                <div className="flex justify-between items-center border-b border-black-100 px-16 py-12">
                  <p className="text-base leading-base">address:</p>
                  <p className="text-xs leading-xs">
                    {orderDetails?.billingAddress?.countryCode || ''} {orderDetails?.billingAddress?.region || ''}{' '}
                    {orderDetails?.billingAddress?.locality || ''} {orderDetails?.billingAddress?.address || ''}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="md:col-start-3 col-start-1 md:col-span-8 col-span-12 md:mt-64 md:mb-64">
              <div className="flex flex-col gap-16 text-center">
                <h2 className="text-2xl">Failed to validate order (order not found). Please try again later.</h2>
                <Link href="/product" className="text-reg underline">
                  RETURN TO PRODUCT PAGE
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Order;
