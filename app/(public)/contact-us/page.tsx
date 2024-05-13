import React from 'react';

import { getImageFullUrl_server } from '@/lib/getImgFullUrl';
import { getPageData, getComponentData } from '@/lib/strapi';

import { FormPagesHero, Footer } from '@/page-components';
import { Form } from '@/components';

export const dynamic = 'force-static';

export async function generateMetadata() {
  const contactPageData = await getPageData('contact-us');
  return {
    title: contactPageData.attributes.seo?.title ?? '',
    description: contactPageData.attributes.seo?.description ?? '',
    alternates: {
      canonical: '/contact-us',
    },
    openGraph: {
      images: [
        `/api/og?title=${contactPageData.attributes.seo?.title ?? ''}&desc=${
          contactPageData.attributes.seo?.description ?? ''
        }` || null,
      ],
    },
  };
}

const ContactUs = async () => {
  const contactPageData = await getPageData('contact-us');
  const footerData = await getComponentData('footer');

  return (
    <div className="lg:bg-supplementary-warm-gray">
      <FormPagesHero
        image={getImageFullUrl_server(contactPageData.attributes.hero_background_image.data)}
        title={contactPageData.attributes.hero_title}
        content={contactPageData.attributes.hero_description}
      />
      <Form formData={contactPageData.attributes.form} />
      <Footer footerData={footerData.attributes} small />
    </div>
  );
};

export default ContactUs;
