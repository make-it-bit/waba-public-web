import React from 'react';

import { getImageFullUrl } from '@/lib/getImgFullUrl';
import { getPageData, getComponentData } from '@/lib/strapi';

import { BusinessCareersHero, WabaForBusiness, Footer } from '@/page-components';

export const dynamic = 'force-static';

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
