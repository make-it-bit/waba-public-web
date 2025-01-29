'use client';
import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type InstagramPostData = {
  id: string;
  caption: string;
  media_url: string;
  media_type: string;
  username: string;
  thumbnail_url?: string;
  permalink: string;
};

type InstagramBlockProps = {
  posts: InstagramPostData[];
};

const InstagramBlock: FC<InstagramBlockProps> = ({ posts }) => {
  return (
    <div className="flex flex-col pb-96 pt-[108px]">
      <div className="container">
        <div className="grid grid-cols-12 mb-[50px]">
          <div className="col-span-12">
            <h1 className="font-rufina sm:text-4xl text-3xl sm:leading-4xl leading-3xl text-center">
              Follow Us on Instagram
            </h1>
          </div>
        </div>
        {posts.length > 0 && (
          <div className="grid grid-cols-12 gap-24 mt-6">
            {posts.map((post, index) => (
              <div className="col-span-6 md:col-span-4 aspect-square relative" key={index}>
                {post.media_type === 'IMAGE' && (
                  <Link href={post.permalink}>
                    <Image
                      src={post.media_url}
                      alt="Instagram image"
                      fill
                      quality={100}
                      style={{ objectFit: 'cover' }}
                      className="rounded-md"
                    />
                  </Link>
                )}
                {post.media_type === 'VIDEO' && (
                  <Link href={post.permalink}>
                    <Image
                      src={post.thumbnail_url || ''}
                      alt="Instagram video thumbnail"
                      fill
                      quality={100}
                      style={{ objectFit: 'cover' }}
                      className="rounded-md"
                    />
                  </Link>
                )}
                {post.media_type === 'CAROUSEL_ALBUM' && (
                  <Link href={post.permalink}>
                    <Image
                      src={post.media_url}
                      alt="Instagram carousel image"
                      fill
                      quality={100}
                      style={{ objectFit: 'cover' }}
                      className="rounded-md"
                    />
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InstagramBlock;
