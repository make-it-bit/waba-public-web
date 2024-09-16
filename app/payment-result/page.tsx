import React from 'react';
import Link from 'next/link';
import { Logger } from 'next-axiom';

// export async function generateMetadata() {
//   const paymentResultData = await getPageData('payment-result');
//   return {
//     title: paymentResultData.attributes.seo?.title ?? '',
//     description: paymentResultData.attributes.seo?.description ?? '',
//     alternates: {
//       canonical: '/payment-result',
//     },
//     openGraph: {
//       images: [
//         `/api/og?title=${paymentResultData.attributes.seo?.title ?? ''}&desc=${
//           paymentResultData.attributes.seo?.description ?? ''
//         }` || null,
//       ],
//     },
//   };
// }

const { BASE_URL } = process.env;

export async function getOrderDetails(orderToken: string) {
  const log = new Logger();

  if (orderToken) {
    const response = await fetch(`${BASE_URL}/api/montonio/validate?orderToken=${orderToken}`);

    if (!response.ok) {
      log.error('Failed to validate order.', { error: response.statusText || 'Unknown error' });
      return null;
    }

    const { data } = await response.json();

    log.info('Order validated successfully.', { data });
    return data.orderData;
  } else {
    log.error('Missing order token.');
    return null;
  }
}

const PaymentResult = async ({ searchParams }) => {
  const orderToken = searchParams['order-token'];
  const orderData = await getOrderDetails(orderToken);

  return (
    <>
      <div className="bg-supplementary-warm-gray">
        <div className="container">
          <div className="grid grid-cols-12">
            <div className="sm:col-start-3 col-start-1 sm:col-span-8 col-span-12">
              <h1 className="font-rufina md:text-7xl text-5xl md:leading-7xl leading-5xl md:text-left text-center md:mt-176 mt-160 md:mb-40 mb-144">
                Payment Result
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="grid grid-cols-12">
          {orderData ? (
            <div className="lg:col-start-4 lg:col-span-6 col-span-12 md:mt-128 md:mb-40">
              <div className="flex flex-col">
                <div className="flex justify-between items-center border-b border-black-100 px-16 py-12">
                  <p className="text-base leading-base">merchantReferenceDisplay:</p>
                  <p className="text-xs leading-xs">{orderData?.merchantReferenceDisplay}</p>
                </div>
                <div className="flex justify-between items-center border-b border-black-100 px-16 py-12">
                  <p className="text-base leading-base">paymentStatus:</p>
                  <p className="text-xs leading-xs">{orderData?.paymentStatus}</p>
                </div>
                <div className="flex justify-between items-center border-b border-black-100 px-16 py-12">
                  <p className="text-base leading-base">grandTotal:</p>
                  <p className="text-xs leading-xs">{orderData?.grandTotal}</p>
                </div>
                <div className="flex justify-between items-center border-b border-black-100 px-16 py-12">
                  <p className="text-base leading-base">currency:</p>
                  <p className="text-xs leading-xs">{orderData?.currency}</p>
                </div>
                <div className="flex justify-between items-center border-b border-black-100 px-16 py-12">
                  <p className="text-base leading-base">senderName:</p>
                  <p className="text-xs leading-xs">{orderData?.senderName}</p>
                </div>
                <div className="flex justify-between items-center border-b border-black-100 px-16 py-12">
                  <p className="text-base leading-base">paymentProviderName:</p>
                  <p className="text-xs leading-xs">{orderData?.paymentProviderName}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="md:col-start-3 col-start-1 md:col-span-8 col-span-12 md:mt-128 md:mb-40">
              <div className="flex flex-col gap-16 text-center">
                <h2 className="text-3xl">Failed to validate order (order not found). Please try again later.</h2>
                <Link href="/product" className="text-xl underline">
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

export default PaymentResult;
