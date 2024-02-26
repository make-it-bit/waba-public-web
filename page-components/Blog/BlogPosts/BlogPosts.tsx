'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';

import { Tag } from '@/components';
import { TextInput, Button } from '@/gui-components/client';

import styles from './_blogPosts.module.scss';

const BlogPost = ({ image, category, title, author, date }) => {
  return (
    <div className="md:col-span-4 col-span-6">
      <div className="flex flex-col gap-24">
        <Link href="/blog/blogPostId">
          <div className="relative w-auto h-256">
            <Image src={image} alt="blog post" fill className="absolute object-cover" />
          </div>
        </Link>
        <div className="flex gap-8 text-deep-purple-100">
          <Tag text={category} />
          <Tag text={category} />
        </div>
        <Link href="/blog/blogPostId">
          <div className="flex flex-col gap-8">
            <p className="text-2xl leading-2xl">{title}</p>
            <p className="text-base leading-base text-black-60">{`${author} ﹒ ${date}`}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

const BlogPosts = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageStatus, setMessageStatus] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const categories = ['all categories', 'category 1', 'category 2', 'category 3', 'category 4', 'category 5'];

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
        setMessage('Thank you. You subscribed successfully!');
      } else {
        setMessageStatus('error');
        const { message } = await response.json();
        setMessage(message);
        setSubscribed(false);
      }
    } catch (error) {
      setMessageStatus('error');
      setMessage('An unknown error occurred.');
      setSubscribed(false);
    }
  };

  return (
    <>
      <div className="border-y border-black-10 py-32 mb-32">
        <div className="container">
          <div className="grid grid-cols-12">
            <div className="col-span-12">
              <div className="flex flex-wrap lg:justify-around justify-center gap-8">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className={classNames(
                      'text-deep-purple-100 cursor-pointer',
                      activeCategoryIndex === index && 'border rounded-40 bg-deep-purple-10'
                    )}
                    onClick={() => setActiveCategoryIndex(index)}
                  >
                    <Tag text={category} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mb-64">
        <div className="grid grid-cols-12 md:gap-64 gap-40">
          <div className="md:col-span-8 col-span-6">
            <div className="grid md:grid-cols-8 grid-cols-6 gap-x-32 gap-y-40">
              <BlogPost
                image="/product-main-info-img-2.png"
                category="category 1"
                title="Blog Post 1 blablabla"
                author="AUTOR KEEGI"
                date="2021-09-01"
              />
              <BlogPost
                image="/product-main-info-img-2.png"
                category="category 1"
                title="Blog Post 2 blablabla"
                author="AUTOR KEEGI"
                date="2021-09-01"
              />
              <BlogPost
                image="/product-main-info-img-2.png"
                category="category 1"
                title="Blog Post 3 blablabla"
                author="AUTOR KEEGI"
                date="2021-09-01"
              />
              <BlogPost
                image="/product-main-info-img-2.png"
                category="category 1"
                title="Blog Post 4 blablabla"
                author="AUTOR KEEGI"
                date="2021-09-01"
              />
              <BlogPost
                image="/product-main-info-img-2.png"
                category="category 1"
                title="Blog Post 5 blablabla"
                author="AUTOR KEEGI"
                date="2021-09-01"
              />
            </div>
          </div>
          <div className="md:col-span-4 col-span-6">
            <div className="flex flex-col gap-32 sticky top-[169px]">
              <div className="flex flex-col gap-8">
                <p className="text-base leading-base font-bold mb-8">NEWSLETTER</p>
                {messageStatus === 'success' ? (
                  <div className="bg-signal-green-20 flex justify-center items-center text-center gap-8 px-16 py-12">
                    <Image src="/icons/check.svg" alt="check" width={16} height={16} />
                    <p className="text-xs leading-xs text-signal-green-100">{message}</p>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col gap-8">
                      <TextInput
                        name="blog-email"
                        value={email}
                        placeholder={'Enter your email'}
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
                          CTA={'Subscribe'}
                          style="tertiary"
                          onClick={handleSubscribe}
                          disabled={subscribed}
                          svg
                        />
                      )}
                    </div>
                    {message !== '' && (
                      <div className="bg-signal-red-10 flex justify-center items-center text-center gap-8 px-16 py-12">
                        <p className="text-xs leading-xs text-signal-red-100">{message}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="flex flex-col gap-8">
                <p className="text-base leading-base font-bold mb-8">FOLLOW US</p>
                <Link href="#" target="_blank">
                  <Tag text="Instagram" svg="/logos/instagram-black.svg" />
                </Link>
                <Link href="#" target="_blank">
                  <Tag text="Twitter" svg="/logos/x-black.svg" />
                </Link>
                <Link href="#" target="_blank">
                  <Tag text="Facebook" svg="/logos/facebook-black.svg" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPosts;
