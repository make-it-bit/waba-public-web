'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';

import { Tag } from '@/components';
import { TextInput, Button } from '@/gui-components/client';

const BlogPost = ({ image, category, title, author, date }) => {
  return (
    <div className="col-span-4">
      <div className="flex flex-col gap-24">
        <div className="relative w-auto h-256">
          <Image src={image} alt="blog post" fill className="absolute object-cover" />
        </div>
        <div className="flex gap-8 text-deep-purple-100">
          <Tag text={category} />
          <Tag text={category} />
        </div>
        <div className="flex flex-col gap-8">
          <p className="text-2xl leading-2xl">{title}</p>
          <p className="text-base leading-base text-black-60">{`${author} ﹒ ${date}`}</p>
        </div>
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
              <div className="flex justify-around">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className={classNames(
                      'text-deep-purple-100 cursor-pointer',
                      activeCategoryIndex === index && 'font-bold'
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
        <div className="grid grid-cols-12 gap-64">
          <div className="col-span-8">
            <div className="grid grid-cols-8 gap-x-32 gap-y-40">
              <BlogPost
                image="/product-main-info-img-1.png"
                category="category 1"
                title="Blog Post 1 blablabla"
                author="AUTHOR KEEGI"
                date="2021-09-01"
              />
              <BlogPost
                image="/product-main-info-img-1.png"
                category="category 1"
                title="Blog Post 1 blablabla"
                author="AUTHOR KEEGI"
                date="2021-09-01"
              />
              <BlogPost
                image="/product-main-info-img-1.png"
                category="category 1"
                title="Blog Post 1 blablabla"
                author="AUTHOR KEEGI"
                date="2021-09-01"
              />
              <BlogPost
                image="/product-main-info-img-1.png"
                category="category 1"
                title="Blog Post 1 blablabla"
                author="AUTHOR KEEGI"
                date="2021-09-01"
              />
              <BlogPost
                image="/product-main-info-img-1.png"
                category="category 1"
                title="Blog Post 1 blablabla"
                author="AUTHOR KEEGI"
                date="2021-09-01"
              />
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex flex-col gap-32 sticky top-[169px]">
              <div className="flex flex-col gap-8">
                <p className="text-base leading-base font-bold mb-8">NEWSLETTER</p>
                <TextInput
                  name="blog-email"
                  value={email}
                  placeholder={'Enter your email'}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button CTA={'Subscribe'} style="tertiary" onClick={handleSubscribe} disabled={subscribed} svg />
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
