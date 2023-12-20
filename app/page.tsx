import React from 'react';

/* import { getPageData } from '../lib/strapi'; */

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
  /* const indexPageData = await getPageData('index');
  console.log('indexPageData: ', indexPageData); */

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
