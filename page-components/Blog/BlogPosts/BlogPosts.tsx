'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';

import { getImageFullUrl_client } from '@/lib/getImgFullUrl';

import { CategoryTag, Tag } from '@/components';
import { TextInput, Button } from '@/gui-components/client';

import styles from './_blogPosts.module.scss';

const BlogPost = ({ image, slug, categories, title, author, date }) => {
  return (
    <div className="md:col-span-4 col-span-6">
      <div className="flex flex-col gap-16">
        <Link href={`/blog${slug}`}>
          <div className="relative w-auto h-256">
            <Image src={image} alt="blog post" fill className="absolute object-cover" />
          </div>
        </Link>
        <div className="flex gap-8">
          {categories.map((category, index) => (
            <CategoryTag key={index} text={category.attributes.name} />
          ))}
        </div>
        <Link href={`/blog${slug}`}>
          <div className="flex flex-col">
            <p className="md:text-2xl md:leading-2xl text-xl leading-xl">{title}</p>
            <p className="text-base leading-base text-black-60">{`${author} ﹒ ${date}`}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

const BlogPosts = ({ blogData, blogPosts }) => {
  const [filteredBlogPosts, setFilteredBlogPosts] = useState(blogPosts);
  const [activeCategory, setActiveCategory] = useState(blogData.blog_categories.data[0].attributes.name);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageStatus, setMessageStatus] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleCategoryChange = (selectedCategory) => {
    if (selectedCategory === blogData.blog_categories.data[0].attributes.name) {
      setFilteredBlogPosts(blogPosts);
    } else {
      setFilteredBlogPosts(
        blogPosts.filter((post) =>
          post.attributes.categories.data.some((category) => category.attributes.name === selectedCategory)
        )
      );
    }
    setActiveCategory(selectedCategory);
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
      if (response.ok) {
        setMessageStatus('success');
        setMessage(blogData.SUCCESS);
      } else {
        setMessageStatus('error');
        const { message } = await response.json();
        setMessage(blogData[message]);
        setSubscribed(false);
      }
    } catch (error) {
      setMessageStatus('error');
      setMessage(blogData.UNKNOWN_ERROR);
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
                {blogData.blog_categories.data.map((category, index) => (
                  <CategoryTag
                    key={index}
                    isInteractive
                    text={category.attributes.name}
                    checked={category.attributes.name === activeCategory}
                    handleClick={() => handleCategoryChange(category.attributes.name)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mb-64">
        <div className="grid grid-cols-12 md:gap-64">
          <div className="md:col-span-8 col-span-12 md:order-1 order-2">
            <div className="grid md:grid-cols-8 grid-cols-6 gap-x-32 gap-y-40">
              {filteredBlogPosts.length === 0 ? (
                <div className="col-span-12 flex justify-center items-center">
                  <p className="text-2xl leading-2xl">No blog posts found in this category.</p>
                </div>
              ) : (
                filteredBlogPosts.map((post, index) => (
                  <BlogPost
                    key={index}
                    slug={post.attributes.slug}
                    image={getImageFullUrl_client(post.attributes.image.data)}
                    categories={post.attributes.categories.data}
                    title={post.attributes.title}
                    author={post.attributes.author}
                    date={post.attributes.date}
                  />
                ))
              )}
            </div>
          </div>
          <div className="md:col-span-4 col-span-12 md:order-2 order-1">
            <div className="flex flex-col gap-32 md:sticky md:top-[169px] md:mb-0 mb-64">
              <div className="flex flex-col gap-8">
                <p className="text-base leading-base font-bold mb-4">{blogData.newsletter_title}</p>
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
                        placeholder={blogData.input_placeholder}
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
                          CTA={blogData.input_button.href_text}
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
                <p className="text-base leading-base font-bold mb-4">{blogData.follow_title}</p>
                {blogData.socials_tags.data.map((social, index) => (
                  <Link key={index} href="#" target="_blank">
                    <Tag text={social.attributes.text} svg={getImageFullUrl_client(social.attributes.logo.data)} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPosts;
