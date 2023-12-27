import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { getImageFullUrl } from '../../../lib/strapi';

import { Button } from '../../../gui-components/client';

const NavbarDesktop = ({ navbarData }) => {
  return (
    <div className="bg-white-100 lg:block hidden">
      <div className="container">
        <div className="relative flex justify-between items-center py-32 gap-8">
          <div className="flex items-center xl:gap-64 gap-32">
            {navbarData.leftside_links.data.map((link, index) => (
              <Link key={index} href={link.attributes.page_link_data.href_src} className="text-sm leading-sm">
                {link.attributes.page_link_data.href_text}
              </Link>
            ))}
          </div>
          <Link href="/" className="absolute left-1/2 translate-x-neg-1/2">
            <Image src={getImageFullUrl(navbarData.waba_logos.data[0])} alt="waba logo" width={96} height={24} />
          </Link>
          <div className="flex items-center gap-64">
            {navbarData.rightside_links.data.map((link, index) => (
              <Link key={index} href={link.attributes.page_link_data.href_src} className="text-sm leading-sm">
                {link.attributes.page_link_data.href_text}
              </Link>
            ))}
            <Link href={navbarData.button.href_src}>
              <Button CTA={navbarData.button.href_text} size="sm" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarDesktop;
