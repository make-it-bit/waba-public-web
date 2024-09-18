import React from 'react';

import { getPageData, getComponentData } from '@/lib/strapi';

import { CheckoutForm, Footer } from '@/page-components';

export const dynamic = 'force-static';

// export async function generateMetadata() {
//     const productPageData = await getPageData('product');
//     return {
//       title: productPageData.attributes.seo?.title ?? '',
//       description: productPageData.attributes.seo?.description ?? '',
//       alternates: {
//         canonical: '/product',
//       },
//       openGraph: {
//         images: [
//           `/api/og?title=${productPageData.attributes.seo?.title ?? ''}&desc=${
//             productPageData.attributes.seo?.description ?? ''
//           }` ?? null,
//         ],
//       },
//     };
// }

const Checkout = async () => {
  const productPageData = await getPageData('product');
  const footerData = await getComponentData('footer');

  return (
    <>
      <CheckoutForm mainInfoData={productPageData.attributes.hero} />
      <Footer footerData={footerData.attributes} small />
    </>
  );
};

export default Checkout;
