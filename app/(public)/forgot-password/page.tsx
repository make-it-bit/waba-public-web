import React from 'react';

import { getComponentData } from '@/lib/strapi';

import { ForgotPasswordForm } from '@/components';
import { Footer } from '@/page-components';

export const dynamic = 'force-static';

const ForgotPassword = async () => {
  const footerData = await getComponentData('footer');

  return (
    <>
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="col-start-4 col-span-6">
            <ForgotPasswordForm />
          </div>
        </div>
      </div>
      <Footer footerData={footerData.attributes} small />
    </>
  );
};

export default ForgotPassword;
