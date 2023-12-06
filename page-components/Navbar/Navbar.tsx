"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { Button } from "../../gui-components/client";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav>
      <div className="bg-white-100">
        <div className="container">
          <div className="relative flex justify-between items-center py-32 gap-8">
            <div className="flex items-center xl:gap-64 gap-32">
              <Link href="#" className="text-sm text-black-100">
                Product
              </Link>
              <Link href="#" className="text-sm text-black-100">
                The Science Behind
              </Link>
              <Link href="#" className="text-sm text-black-100">
                Results
              </Link>
              <Link href="#" className="text-sm text-black-100">
                About Us
              </Link>
            </div>
            <Link href="/" className="absolute left-1/2 translate-x-neg-1/2">
              <Image
                src="/logos/logo.svg"
                alt="waba logo"
                width={96}
                height={24}
              />
            </Link>
            <div className="flex items-center gap-64">
              <Link href="#" className="text-sm text-black-100">
                FAQ
              </Link>
              <Link href="#" className="text-sm text-black-100">
                Blog
              </Link>
              <Button CTA="Shop now" onClick={() => router.push("#")} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
