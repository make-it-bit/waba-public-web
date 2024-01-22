import React from 'react';

import { getPageData, getComponentData } from '@/lib/strapi';
import { getImageFullUrl_server } from '@/lib/getImgFullUrl';

import { BusinessCareersHero, CareersAtWaba, Footer } from '@/page-components';

export const dynamic = 'force-static';

export async function generateMetadata() {
  const careersPageData = await getPageData('careers-at-waba');
  return {
    title: careersPageData.attributes.seo.title,
    description: careersPageData.attributes.seo.description,
    alternates: {
      canonical: '/careers-at-waba',
    },
    openGraph: {
      //images: [seo_component.og_image || null],
    },
  };
}

const CareersAtWABA = async () => {
  const careersPageData = await getPageData('careers-at-waba');
  const footerData = await getComponentData('footer');

  return (
    <div className="lg:bg-supplementary-warm-gray">
      <BusinessCareersHero
        image={getImageFullUrl_server(careersPageData.attributes.hero_background_image.data)}
        title={careersPageData.attributes.hero_title}
        content={careersPageData.attributes.hero_description}
      />
      <CareersAtWaba careersData={careersPageData.attributes.form} />
      <Footer footerData={footerData.attributes} small />
    </div>
  );
};

export default CareersAtWABA;
