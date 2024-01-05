'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';

import { getImageFullUrl } from '@/lib/strapi';

import { Button } from '@/gui-components/client';

const NavbarDesktop = ({ navbarData }) => {
  const pathname = usePathname();

  return (
    <div className="bg-white-100 lg:block hidden">
      <div className="container">
        <div className="relative flex justify-between items-center py-32">
          <div className="flex flex-1 items-center 2xl:gap-64 xl:gap-32 gap-16">
            {navbarData.leftside_links.data.map((link, index) => (
              <Link
                key={index}
                href={link.attributes.page_link_data.href_src}
                className={classNames(
                  'text-sm leading-sm',
                  pathname === link.attributes.page_link_data.href_src && 'border-b border-black-100'
                )}
              >
                {link.attributes.page_link_data.href_text}
              </Link>
            ))}
          </div>
          <div className="flex flex-0 justify-center">
            <Link href="/">
              <Image src={getImageFullUrl(navbarData.waba_logos.data[0])} alt="waba logo" width={96} height={24} />
            </Link>
          </div>
          <div className="flex flex-1 justify-end items-center 2xl:gap-64 xl:gap-32 gap-16">
            {navbarData.rightside_links.data.map((link, index) => (
              <Link
                key={index}
                href={link.attributes.page_link_data.href_src}
                className={classNames(
                  'text-sm leading-sm',
                  pathname === link.attributes.page_link_data.href_src && 'border-b border-black-100'
                )}
              >
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
