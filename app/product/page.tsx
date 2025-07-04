import React from 'react';

import { getPageData, getComponentData, getUserVideos, getScienceArticles, getCompareSection } from '@/lib/strapi';

import { 
  MainInfo,
  ProductInfo,
  LogoBar,
  CTABlock,
  Footer,
  SingleMulti,
  HappyUsers,
  VerifiedScience,
  QuoteBar,
  VisibleTransformation,
  ProductInfoTable,
  SenjaTestimonials,
  Colors
} from '@/page-components';

export const dynamic = 'force-static';

export async function generateMetadata() {
  const productPageData = await getPageData('product');
  return {
    title: productPageData.attributes.seo?.title ?? '',
    description: productPageData.attributes.seo?.description ?? '',
    alternates: {
      canonical: '/product',
    },
    openGraph: {
      images: [
        `/api/og?title=${productPageData.attributes.seo?.title ?? ''}
          &desc=${productPageData.attributes.seo?.description ?? ''}`,
      ],
    },
  };
}

const Product = async () => {
  const productPageData = await getPageData('product');
  const indexPageData = await getPageData('index');
  const ctaBlockData = await getComponentData('cta-block');
  const footerData = await getComponentData('footer');
  const userVideos = await getUserVideos();
  const scienceArticles = await getScienceArticles();
  const compareSection = await getCompareSection();

  return (
    <>
      <MainInfo mainInfoData={productPageData.attributes.hero} />
      <ProductInfo productInfoData={productPageData.attributes.product_info} faqData={productPageData.attributes.faq} compareSection={compareSection}/>
      <QuoteBar quoteBarData={productPageData.attributes.quote_bar}/>
      <VisibleTransformation transformationData={productPageData.attributes.transformation}/>
      <VerifiedScience verifiedScienceData={productPageData.attributes.backed_science} scienceArticles={scienceArticles} />
      <HappyUsers happyUsersData={{title: productPageData.attributes.waba_users_title}} userVideos={userVideos}/>
      <Colors colorsData={indexPageData.attributes.color} />
      <SingleMulti new_price={productPageData.attributes.hero.new_price}/>
      {/* <Warranty warrantyData={productPageData.attributes.warranty} /> */}
      {/* <ProductFAQ productFaqData={productPageData.attributes.faq} /> */}
      <ProductInfoTable />
      <SenjaTestimonials />
      <LogoBar />
      <CTABlock ctaBlockData={ctaBlockData.attributes} />
      <Footer footerData={footerData.attributes} small />
    </>
  );
};

export default Product;
