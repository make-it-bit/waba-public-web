import React from 'react';

import { getFaqs, getPageData } from '../lib/strapi';

export const dynamic = 'force-static';

import {
  Hero,
  Colors,
  Foundations,
  Video,
  Testimonials,
  LogoBar,
  CTABlock,
  PreFooterCard,
  Footer,
} from '../page-components';

const Home = async () => {
  const indexPageData = await getPageData('index');
  console.log('indexPageData: ', indexPageData);
  const footerPageData = await getPageData('footer');
  console.log('footerPageData: ', footerPageData);
  /*  const faqs = await getFaqs(); */

  return (
    <>
      {/* {faqs?.map((faq) => (
        <>
          <p>{faq.category}</p>
        </>
      ))} */}
      <Hero />
      <Colors />
      <Foundations />
      <Video />
      <Testimonials />
      <LogoBar />
      <CTABlock />
      <PreFooterCard />
      <Footer />
    </>
  );
};

export default Home;
