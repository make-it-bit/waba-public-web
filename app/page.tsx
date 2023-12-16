import React from 'react';

import { getPageData } from '../lib/strapi';

export const dynamic = 'force-static';

import { Hero, Colors, Foundations, Video, Testimonials, LogoBar, CTABlock, PreFooterCard, Footer } from '../page-components';

const Home = async () => {
  const indexPageData = await getPageData('index');

  return (
    <>
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
