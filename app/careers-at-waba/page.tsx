import React from 'react';

import { getPageData, getComponentData, getImageFullUrl } from '@/lib/strapi';

import { BusinessCareersHero, CareersAtWaba, Footer } from '@/page-components';

const CareersAtWABA = async () => {
  const careersPageData = await getPageData('careers-at-waba');
  const footerData = await getComponentData('footer');

  return (
    <div className="lg:bg-supplementary-warm-gray">
      <BusinessCareersHero
        image={getImageFullUrl(careersPageData.attributes.hero_background_image.data)}
        title={careersPageData.attributes.hero_title}
        content={careersPageData.attributes.hero_description}
      />
      <CareersAtWaba careersData={careersPageData.attributes.form} />
      <Footer footerData={footerData.attributes} small />
    </div>
  );
};

export default CareersAtWABA;
