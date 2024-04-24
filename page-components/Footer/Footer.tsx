'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';

import { getImageFullUrl_client } from '@/lib/getImgFullUrl';

import { TextInput, Button } from '@/gui-components/client';

import styles from './_footer.module.scss';

const Footer = ({ footerData, small = false }) => {
  const pathname = usePathname();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageStatus, setMessageStatus] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async () => {
    try {
      setMessage('');
      setSubscribed(true);
      const response = await fetch('api/mailchimp/subscribe', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        setMessageStatus('success');
        setMessage(footerData.footer_top.SUCCESS);
      } else {
        setMessageStatus('error');
        const { message } = await response.json();
        setMessage(footerData.footer_top[message]);
        setSubscribed(false);
      }
    } catch (error) {
      setMessageStatus('error');
      setMessage(footerData.footer_top.UNKNOWN_ERROR);
      setSubscribed(false);
    }
  };

  return (
    <div className={classNames('mt-auto', styles.background)}>
      <div className="container">
        <div className={classNames('grid grid-cols-12', small ? 'pt-48 pb-72' : 'md:pt-224 pt-120 md:pb-32 pb-72')}>
          {!small && (
            <div className="xl:col-start-5 lg:col-start-4 md:col-start-3 col-start-2 xl:col-span-4 lg:col-span-6 md:col-span-8 col-span-10 md:mb-184 mb-48">
              <div className="flex flex-col items-center mb-64 gap-16 text-center text-white-100">
                <Image
                  src={getImageFullUrl_client(footerData.footer_top.icon.data)}
                  alt="email"
                  width={56}
                  height={56}
                  quality={100}
                />
                <h1 className="font-rufina text-4xl leading-4xl">{footerData.footer_top.title}</h1>
                <p className="text-sm leading-sm">{footerData.footer_top.description}</p>
              </div>
              {messageStatus === 'success' ? (
                <div className="bg-signal-green-10 flex justify-center items-center text-center gap-8 px-16 py-12">
                  <Image src="/icons/check.svg" alt="check" width={16} height={16} quality={100} />
                  <p className="text-xs leading-xs text-signal-green-100">{message}</p>
                </div>
              ) : (
                <>
                  <div className="flex md:flex-row flex-col md:gap-8 gap-16">
                    <TextInput
                      theme="light"
                      name="footer-email"
                      value={email}
                      placeholder={footerData.footer_top.input_placeholder}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {subscribed && message === '' ? (
                      <div className="bg-deep-purple-20 flex justify-center items-center px-24 py-8">
                        <div
                          className={classNames(
                            'w-24 h-24 border-2 border-purple-100 border-b-transparent rounded-[50%]',
                            styles.loader
                          )}
                        ></div>
                      </div>
                    ) : (
                      <Button
                        CTA={footerData.footer_top.input_button.href_text}
                        style="tertiary"
                        onClick={handleSubscribe}
                        disabled={subscribed}
                        svg
                      />
                    )}
                  </div>
                  {message !== '' && (
                    <div className="bg-signal-red-10 flex justify-center items-center text-center gap-8 px-16 py-12 mt-8">
                      <p className="text-xs leading-xs text-signal-red-100">{message}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
          <div className="col-start-2 col-span-10">
            <div className="flex flex-col md:gap-32 gap-48">
              {!small && <div className="md:hidden block border border-white-100"></div>}
              <div className="flex md:flex-row flex-col lg:justify-evenly md:justify-between items-center md:gap-0 gap-8 text-center text-white-100">
                {footerData.page_links.data.map((link, index) => (
                  <Link
                    key={index}
                    href={link.attributes.page_link_data.href_src}
                    className={classNames(
                      'text-sm leading-sm hover:border-b hover:border-white-100 hover:mb-[-1px]',
                      pathname === link.attributes.page_link_data.href_src && 'border-b border-white-100 mb-[-1px]'
                    )}
                  >
                    {link.attributes.page_link_data.href_text}
                  </Link>
                ))}
              </div>
              <div className="border border-white-100"></div>
              <div className="relative flex md:flex-row flex-col md:justify-between justify-center items-center gap-y-48">
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
                <div className="flex flex-wrap sm:justify-normal justify-center xl:gap-40 lg:gap-40 md:gap-16 gap-40 gap-y-8">
                  {footerData.terms_policies_links.data.map((link, index) => (
                    <Link
                      key={index}
                      href={link.attributes.page_link_data.href_src}
                      className="text-xs leading-xs text-white-100"
                    >
                      {link.attributes.page_link_data.href_text}
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

export default Footer;
