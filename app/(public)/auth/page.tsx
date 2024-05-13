import React from 'react';

import { getComponentData } from '@/lib/strapi';

import { AuthForm } from '@/components';
import { Footer } from '@/page-components';

export const dynamic = 'force-static';

const Auth = async () => {
  const footerData = await getComponentData('footer');

  return (
    <>
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="lg:col-start-4 lg:col-span-6 md:col-start-3 md:col-span-8 col-span-12">
            <AuthForm />
          </div>
        </div>
      </div>
      <Footer footerData={footerData.attributes} small />
    </>
  );
};

export default Auth;
