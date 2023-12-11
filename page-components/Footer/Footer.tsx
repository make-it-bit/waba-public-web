import React from "react";
import Image from "next/image";
import Link from "next/link";

import { TextInput, Button } from "../../gui-components/client";

const Footer = () => {
  return (
    <div className="bg-black-100">
      <div className="container">
        <div className="grid grid-cols-12 mt-448 pt-224">
          <div className="col-start-5 col-span-4 mb-184">
            <div className="flex flex-col items-center mb-64 gap-16 text-center text-white-100">
              <Image
                src="/icons/email-white.svg"
                alt="email"
                width={56}
                height={56}
              />
              <h1 className="font-rufina text-4xl leading-4xl">
                Keep up with the latest news from WABA
              </h1>
              <p className="text-sm leading-sm">
                No-SPAM Guarantee. Just useful insights on your skincare.
              </p>
            </div>
            <div className="flex gap-8">
              <TextInput
                theme="light"
                name="footer-email"
                value=""
                placeholder="Enter your email"
                onChange={() => {}}
              />
              <Button CTA="Subscribe" onClick={() => {}} svg />
            </div>
          </div>
          <div className="col-start-2 col-span-10">
            <div className="flex flex-col gap-32">
              <div className="flex justify-center gap-64">
                <Link
                  href="/product"
                  className="text-sm leading-sm text-white-100"
                >
                  Product
                </Link>
                <Link href="#" className="text-sm leading-sm text-white-100">
                  The Science Behind
                </Link>
                <Link href="#" className="text-sm leading-sm text-white-100">
                  Results
                </Link>
                <Link href="#" className="text-sm leading-sm text-white-100">
                  About Us
                </Link>
                <Link href="#" className="text-sm leading-sm text-white-100">
                  FAQ
                </Link>
                <Link href="#" className="text-sm leading-sm text-white-100">
                  Blog
                </Link>
              </div>
              <div className="border border-white-100"></div>
            </div>
            <div className="grid grid-cols-10 my-32">
              <div className="col-start-5 col-span-2">
                <div className="flex justify-center items-center gap-40">
                  <Image
                    src="/logos/instagram.svg"
                    alt="instagram"
                    width={16}
                    height={16}
                  />
                  <Image src="/logos/x.svg" alt="x" width={16} height={16} />
                  <Image
                    src="/logos/facebook.svg"
                    alt="facebook"
                    width={16}
                    height={16}
                  />
                </div>
              </div>
              <div className="col-start-9 col-span-2">
                <div className="flex justify-between items-center">
                  <Link href="#" className="text-xs leading-xs text-white-100">
                    Shipping Policy
                  </Link>
                  <Link href="#" className="text-xs leading-xs text-white-100">
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
