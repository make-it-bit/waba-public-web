'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';

import { getImageFullUrl_client } from '@/lib/getImgFullUrl';

import styles from './_footerSlim.module.scss';

const FooterSlim = ({ footerData }) => {
  return (
    <div className={classNames('mt-auto', styles.background)}>
      <div className="container">
        <div className="grid grid-cols-12 pt-48 pb-72">
          <div className="col-start-2 col-span-10">
            <div className="flex flex-col md:gap-32 gap-48">
              <div className="border border-white-100"></div>
              <div className="relative flex md:flex-row flex-col justify-center items-center gap-y-48">
                <div className="flex lg:gap-40 md:gap-16 gap-40">
                  {footerData.social_media_links.data.map((link, index) => (
                    <Link key={index} href={link.attributes.href} target={link.attributes.target}>
                      <Image
                        src={getImageFullUrl_client(link.attributes.icon.data)}
                        alt={link.attributes.name}
                        width={16}
                        height={16}
                        quality={100}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterSlim;
