'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { getImageFullUrl_client } from '@/lib/getImgFullUrl';

const NavbarSlim = ({ navbarData }) => {
  const pathname = usePathname();

  if (!pathname.includes('/offers')) return null;

  return (
    <div className="bg-white-100">
      <div className="container">
        <div className="relative flex justify-center items-center lg:py-32 py-16">
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
      </div>
    </div>
  );
};

export default NavbarSlim;
