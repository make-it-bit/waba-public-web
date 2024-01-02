'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';

import { getImageFullUrl } from '@/lib/strapi';

import { TextInput, Button } from '@/gui-components/client';

import styles from './_footer.module.scss';

const Footer = ({ footerData, small = false }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const messageMap = (message) =>
    ({
      MEMBER_EXISTS: 'This email has already been added.',
      INVALID_RESOURCE: 'Please enter a valid email address.',
      UNKNOWN_ERROR: 'An unknown error occurred.',
      SUCCESS: 'Thank you. You subscribed successfully!',
    }[message]);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

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
      let answer;
      if (response.ok) {
        answer = 'SUCCESS';
      } else {
        const { message } = await response.json();
        answer = message;
        setEmail('');
        setSubscribed(false);
      }
      setMessage(messageMap(answer));
    } catch (error) {
      setEmail('');
      setMessage(messageMap(error.message));
      setSubscribed(false);
    }
  };

  return (
    <div className={styles.background}>
      <div className="container">
        <div
          className={classNames(
            'grid grid-cols-12',
            small ? 'pt-48 pb-72' : 'md:pt-224 pt-128 md:pb-32 pb-72 md:mt-456 mt-1000'
          )}
        >
          {!small && (
            <div className="md:col-start-5 col-start-2 md:col-span-4 col-span-10 md:mb-184 mb-48">
              <div className="flex flex-col items-center mb-64 gap-16 text-center text-white-100">
                <Image src="/icons/email-white.svg" alt="email" width={56} height={56} />
                <h1 className="font-rufina text-4xl leading-4xl">{footerData.footer_top.title}</h1>
                <p className="text-sm leading-sm">{footerData.footer_top.description}</p>
              </div>
              {message === 'SUCCESS' ? (
                <div className="bg-signal-green-10 flex justify-center items-center text-center gap-8 px-16 py-12">
                  <Image src="/icons/check.svg" alt="check" width={16} height={16} />
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
                      onChange={handleChange}
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
                  <Link key={index} href={link.attributes.page_link_data.href_src} className="text-sm leading-sm">
                    {link.attributes.page_link_data.href_text}
                  </Link>
                ))}
              </div>
              <div className="border border-white-100"></div>
              <div className="relative flex md:flex-row flex-col md:justify-end justify-center items-center gap-y-48">
                <div className="md:absolute top-0 left-1/2 md:translate-x-neg-1/2">
                  <div className="flex gap-40">
                    {footerData.social_media_links.data.map((link, index) => (
                      <Link key={index} href={link.attributes.href} target={link.attributes.target}>
                        <Image
                          src={getImageFullUrl(link.attributes.icon.data)}
                          alt={link.attributes.name}
                          width={16}
                          height={16}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="flex gap-40">
                  <Link href={footerData.shipping_policy.href_src} className="text-xs leading-xs text-white-100">
                    {footerData.shipping_policy.href_text}
                  </Link>
                  <Link href={footerData.privacy_policy.href_src} className="text-xs leading-xs text-white-100">
                    {footerData.privacy_policy.href_text}
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
