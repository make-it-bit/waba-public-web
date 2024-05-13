'use client';

import React from 'react';
import { usePathname, redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';

import { GetAuthenticatedUser, handleSignOut } from '@/lib/auth';
import { getImageFullUrl_client } from '@/lib/getImgFullUrl';

const NavbarDesktop = ({ navbarData }) => {
  const pathname = usePathname();
  const user = GetAuthenticatedUser();

  const handleClick = async () => {
    try {
      await handleSignOut();
      redirect('/auth');
    } catch (error) {
      console.log('error: ', error);
    }
  };

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
                  'text-sm leading-sm hover:border-b hover:border-black-100 hover:mb-0',
                  pathname === link.attributes.page_link_data.href_src && 'border-b border-black-100 mb-0'
                )}
              >
                {link.attributes.page_link_data.href_text}
              </Link>
            ))}
          </div>
          <div className="flex flex-0 justify-center">
            <Link href="/">
              <Image
                src={getImageFullUrl_client(navbarData.waba_logos.data[0])}
                alt="waba logo"
                width={96}
                height={24}
                quality={100}
              />
            </Link>
          </div>
          <div className="flex flex-1 justify-end items-center 2xl:gap-64 xl:gap-32 gap-16">
            {navbarData.rightside_links.data.map((link, index) => (
              <Link
                key={index}
                href={link.attributes.page_link_data.href_src}
                className={classNames(
                  'text-sm leading-sm hover:border-b hover:border-black-100 hover:mb-0',
                  pathname === link.attributes.page_link_data.href_src && 'border-b border-black-100 mb-0'
                )}
              >
                {link.attributes.page_link_data.href_text}
              </Link>
            ))}
            <Link
              href={user ? '/profile' : '/auth'}
              className={classNames(
                'text-sm leading-sm hover:border-b hover:border-black-100 hover:mb-0',
                (pathname === '/profile' ||
                  pathname === '/wishlist' ||
                  pathname === '/orders' ||
                  pathname === '/discounts') &&
                  'border-b border-black-100 mb-0'
              )}
            >
              {user ? 'My profile' : 'Sign in / Sign up'}
            </Link>
            {user && (
              <p
                className="text-sm leading-sm cursor-pointer hover:border-b hover:border-black-100 hover:mb-0"
                onClick={handleClick}
              >
                Sign out
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarDesktop;
