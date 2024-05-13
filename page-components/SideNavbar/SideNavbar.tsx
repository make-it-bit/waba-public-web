'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import classNames from 'classnames';

const SideNavbar = () => {
  const pathname = usePathname();

  const navbarData = [
    { href_text: 'My profile settings', href_src: '/profile' },
    { href_text: 'My wish list', href_src: '/wishlist' },
    { href_text: 'My orders', href_src: '/orders' },
    { href_text: 'My referrals / Discount codes', href_src: '/discounts' },
  ];
  const [activeLinkId, setActiveLinkId] = useState(navbarData.findIndex((item) => item.href_src === pathname));

  return (
    <div className="flex flex-col cursor-pointer">
      {navbarData.map((item, index) => (
        <div key={index} className="flex border-l border-black-60" onClick={() => setActiveLinkId(index)}>
          <div className={classNames('w-4', activeLinkId === index ? 'bg-black-100' : 'bg-transparent')}></div>
          <Link href={item.href_src}>
            <p
              className={classNames(
                'font-rufina text-2xl leading-2xl py-32 ml-56',
                activeLinkId === index ? 'text-black-100' : 'text-black-30'
              )}
            >
              {item.href_text}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SideNavbar;
