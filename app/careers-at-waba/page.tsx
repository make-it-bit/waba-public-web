/* 'use client'; */

import React from 'react';

import { getComponentData } from '../../lib/strapi';

import { BusinessCareersHero, Footer } from '../../page-components';

/* import { Form } from '../../components'; */

const CareersAtWaba = async () => {
  const footerData = await getComponentData('footer');

  return (
    <div className="lg:bg-supplementary-warm-gray">
      <BusinessCareersHero
        image="/careers-at-waba-hero-img.png"
        title="Careers at
WABA"
        content="Our team is our most valuable asset, and we're looking for passionate innovators to help us shape the future of beauty and wellness. Whether you're an engineer with a vision for cutting-edge devices or a beauty influencer with a knack for engaging audiences, your journey towards making a significant impact in the industry starts here."
      />
      {/* <Form
        title="Innovate with Us"
        content="Are you currently crafting solutions with our competitors but yearn for a workspace that values your creativity and drive? WABA offers a dynamic environment where your contributions lead to tangible advancements in skincare. We're on the lookout for bright minds and spirited professionals who are ready to push boundaries and redefine standards."
      /> */}
      <Footer footerData={footerData.attributes} small />
    </div>
  );
};

export default CareersAtWaba;
