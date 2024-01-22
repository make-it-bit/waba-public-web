import React from 'react';

import { getImageFullUrl_server } from '@/lib/getImgFullUrl';
import { getPageData, getComponentData } from '@/lib/strapi';

import { BusinessCareersHero, WabaForBusiness, Footer } from '@/page-components';

export const dynamic = 'force-static';

export async function generateMetadata() {
  const businessPageData = await getPageData('waba-for-business');
  return {
    title: businessPageData.attributes.seo.title,
    description: businessPageData.attributes.seo.description,
    alternates: {
      canonical: '/waba-for-business',
    },
    openGraph: {
      //images: [seo_component.og_image || null],
    },
  };
}

const WABAForBusiness = async () => {
  const businessPageData = await getPageData('waba-for-business');
  const footerData = await getComponentData('footer');

  return (
    <div className="lg:bg-supplementary-warm-gray">
      <BusinessCareersHero
        image={getImageFullUrl_server(businessPageData.attributes.hero_background_image.data)}
        title={businessPageData.attributes.hero_title}
        content={businessPageData.attributes.hero_description}
      />
      <WabaForBusiness businessData={businessPageData.attributes.form} />
      <Footer footerData={footerData.attributes} small />
    </div>
  );
};

export default WABAForBusiness;
