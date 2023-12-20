import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '../../../gui-components/client';

const NavbarDesktop = () => {
  return (
    <div className="bg-white-100 lg:block hidden">
      <div className="container">
        <div className="relative flex justify-between items-center py-32 gap-8">
          <div className="flex items-center xl:gap-64 gap-32">
            <Link href="/product" className="text-sm leading-sm">
              Product
            </Link>
            <Link href="/science-behind" className="text-sm leading-sm">
              The Science Behind
            </Link>
            <Link href="/results" className="text-sm leading-sm">
              Results
            </Link>
            <Link href="/about-us" className="text-sm leading-sm">
              About Us
            </Link>
          </div>
          <Link href="/" className="absolute left-1/2 translate-x-neg-1/2">
            <Image src="/logos/logo-black.svg" alt="waba logo" width={96} height={24} />
          </Link>
          <div className="flex items-center gap-64">
            <Link href="/faq" className="text-sm leading-sm">
              FAQ
            </Link>
            {/* <Link href="#" className="text-sm leading-sm">
              Blog
            </Link> */}
            <Link href="#">
              <Button CTA="Shop now" size="sm" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarDesktop;
