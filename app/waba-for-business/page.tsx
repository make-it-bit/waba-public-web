import React from 'react';

import { getPageData, getComponentData, getImageFullUrl } from '@/lib/strapi';

import { BusinessCareersHero, WabaForBusiness, Footer } from '@/page-components';

const WABAForBusiness = async () => {
  const businessPageData = await getPageData('waba-for-business');
  const footerData = await getComponentData('footer');

  return (
    <div className="lg:bg-supplementary-warm-gray">
      <BusinessCareersHero
        image={getImageFullUrl(businessPageData.attributes.hero_background_image.data)}
        title={businessPageData.attributes.hero_title}
        content={businessPageData.attributes.hero_description}
      />
      <WabaForBusiness businessData={businessPageData.attributes.form} />
      <Footer footerData={footerData.attributes} small />
    </div>
  );
};

export default WABAForBusiness;
