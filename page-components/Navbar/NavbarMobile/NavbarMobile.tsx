"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { Button } from "../../../gui-components/client";

const NavbarMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return isOpen ? (
    <div className="lg:hidden block fixed bg-black-100 w-full h-screen z-20">
      <div className="container">
        <div className="relative flex justify-between items-center py-12 gap-8">
          <Image
            src="/icons/hamburger-menu-close.svg"
            width={32}
            height={32}
            alt="mobile menu close"
            className="d-block cursor-pointer"
            onClick={handleClick}
          />
          <Link href="/" className="absolute left-1/2 translate-x-neg-1/2">
            <Image
              src="/logos/logo-small-white.svg"
              alt="waba logo"
              width={80}
              height={20}
            />
          </Link>
          <Button
            CTA="Shop now"
            style="tertiary"
            size="sm"
            onClick={() => router.push("#")}
            svg={false}
          />
        </div>
        <div className="flex flex-col items-center mt-72 gap-48">
          <Link
            href="/product"
            className="font-rufina text-xl leading-xl text-white-100"
          >
            Product
          </Link>
          <Link
            href="#"
            className="font-rufina text-xl leading-xl text-white-100"
          >
            The Science Behind
          </Link>
          <Link
            href="/results"
            className="font-rufina text-xl leading-xl text-white-100"
          >
            Results
          </Link>
          <Link
            href="#"
            className="font-rufina text-xl leading-xl text-white-100"
          >
            About Us
          </Link>
          <Link
            href="/faq"
            className="font-rufina text-xl leading-xl text-white-100"
          >
            FAQ
          </Link>
          <Link
            href="#"
            className="font-rufina text-xl leading-xl text-white-100"
          >
            Blog
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div className="lg:hidden block bg-white-100">
      <div className="container">
        <div className="relative flex justify-between items-center py-12 gap-8">
          <Image
            src="/icons/hamburger-menu-open.svg"
            width={32}
            height={32}
            alt="mobile menu open"
            className="d-block cursor-pointer"
            onClick={handleClick}
          />
          <Link href="/" className="absolute left-1/2 translate-x-neg-1/2">
            <Image
              src="/logos/logo-small-black.svg"
              alt="waba logo"
              width={80}
              height={20}
            />
          </Link>
          <Button
            CTA="Shop now"
            size="sm"
            onClick={() => router.push("#")}
            svg={false}
          />
        </div>
      </div>
    </div>
  );
};

export default NavbarMobile;
