'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';

import { TextInput, Button } from '../../gui-components/client';

import styles from './_footer.module.scss';

const Footer = ({ small = false }) => {
  return (
    <div className={styles.background}>
      <div className="container">
        <div
          className={classNames(
            'grid grid-cols-12',
            small ? 'pt-48 pb-72' : 'md:pt-224 pt-120 md:pb-32 pb-72 md:mt-456 mt-1000'
          )}
        >
          {!small && (
            <div className="md:col-start-5 col-start-2 md:col-span-4 col-span-10 md:mb-184 mb-48">
              <div className="flex flex-col items-center mb-64 gap-16 text-center text-white-100">
                <Image src="/icons/email-white.svg" alt="email" width={56} height={56} />
                <h1 className="font-rufina text-4xl leading-4xl">Keep up with the latest news from WABA</h1>
                <p className="text-sm leading-sm">No-SPAM Guarantee. Just useful insights on your skincare.</p>
              </div>
              <div className="flex md:flex-row flex-col md:gap-8 gap-16">
                <TextInput
                  theme="light"
                  name="footer-email"
                  value=""
                  placeholder="Enter your email"
                  onChange={() => {}}
                />
                <Button CTA="Subscribe" style="tertiary" onClick={() => {}} svg />
              </div>
            </div>
          )}
          <div className="col-start-2 col-span-10">
            <div className="flex flex-col md:gap-32 gap-48">
              {!small && <div className="md:hidden block border border-white-100"></div>}
              <div className="flex md:flex-row flex-col lg:justify-evenly md:justify-between items-center md:gap-0 gap-8 text-center">
                <Link href="/product" className="text-sm leading-sm text-white-100">
                  Product
                </Link>
                <Link href="/science-behind" className="text-sm leading-sm text-white-100">
                  The Science Behind
                </Link>
                <Link href="/results" className="text-sm leading-sm text-white-100">
                  Results
                </Link>
                <Link href="/about-us" className="text-sm leading-sm text-white-100">
                  About Us
                </Link>
                {/* <Link href="#" className="text-sm leading-sm text-white-100">
                  Blog
                </Link> */}
                <Link href="/careers-at-waba" className="text-sm leading-sm text-white-100">
                  Careers
                </Link>
                <Link href="/waba-for-business" className="text-sm leading-sm text-white-100">
                  WABA for Business
                </Link>
              </div>
              <div className="border border-white-100"></div>
              <div className="relative flex md:flex-row flex-col md:justify-end justify-center items-center gap-y-48">
                <div className="md:absolute top-0 left-1/2 md:translate-x-neg-1/2">
                  <div className="flex gap-40">
                    <Image src="/logos/instagram.svg" alt="instagram" width={16} height={16} />
                    <Image src="/logos/x.svg" alt="x" width={16} height={16} />
                    <Image src="/logos/facebook.svg" alt="facebook" width={16} height={16} />
                  </div>
                </div>
                <div className="flex gap-40">
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
