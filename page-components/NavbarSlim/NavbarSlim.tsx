'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { getImageFullUrl_client } from '@/lib/getImgFullUrl';

const NavbarSlim = ({ navbarData }) => {
  const pathname = usePathname();

  if (!pathname.includes('/downloadables')) return null;

  return (
    <div className="bg-white-100 lg:block hidden">
      <div className="container">
        <div className="relative flex justify-center items-center py-32">
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
