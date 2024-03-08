'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';

import { getImageFullUrl_client } from '@/lib/getImgFullUrl';

import { Button } from '@/gui-components/client';

const NavbarMobile = ({ navbarData }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return isOpen ? (
    <div className="lg:hidden block fixed bg-black-100 w-full h-screen top-[41px]">
      <div className="container">
        <div className="relative flex justify-between items-center py-12 gap-8">
          <Image
            src={getImageFullUrl_client(navbarData.menu_icons.data[1])}
            width={32}
            height={32}
            alt="mobile menu close"
            className="d-block cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
          <Link href="/" className="absolute left-1/2 translate-x-neg-1/2" onClick={() => setIsOpen(!isOpen)}>
            <Image src={getImageFullUrl_client(navbarData.waba_logos.data[3])} alt="waba logo" width={80} height={20} />
          </Link>
          <Link href={navbarData.button.href_src} onClick={() => setIsOpen(!isOpen)}>
            <Button CTA={navbarData.button.href_text} style="tertiary" size="sm" />
          </Link>
        </div>
        <div className="flex flex-col items-center mt-72 gap-48 text-white-100">
          {navbarData.leftside_links.data.map((link, index) => (
            <Link
              key={index}
              href={link.attributes.page_link_data.href_src}
              className={classNames(
                'text-sm leading-sm hover:border-b hover:border-white-100 hover:mb-0',
                pathname === link.attributes.page_link_data.href_src && 'border-b border-black-100 mb-0'
              )}
              onClick={() => setIsOpen(!isOpen)}
            >
              {link.attributes.page_link_data.href_text}
            </Link>
          ))}
          {navbarData.rightside_links.data.map((link, index) => (
            <Link
              key={index}
              href={link.attributes.page_link_data.href_src}
              className={classNames(
                'text-sm leading-sm hover:border-b hover:border-white-100 hover:mb-0',
                pathname === link.attributes.page_link_data.href_src && 'border-b border-black-100 mb-0'
              )}
              onClick={() => setIsOpen(!isOpen)}
            >
              {link.attributes.page_link_data.href_text}
            </Link>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="lg:hidden block bg-white-100">
      <div className="container">
        <div className="relative flex justify-between items-center py-12 gap-8">
          <Image
            src={getImageFullUrl_client(navbarData.menu_icons.data[0])}
            width={32}
            height={32}
            alt="mobile menu open"
            className="d-block cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
          <Link href="/" className="absolute left-1/2 translate-x-neg-1/2">
            <Image src={getImageFullUrl_client(navbarData.waba_logos.data[2])} alt="waba logo" width={80} height={20} />
          </Link>
          <Link href={navbarData.button.href_src}>
            <Button CTA={navbarData.button.href_text} size="sm" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavbarMobile;
