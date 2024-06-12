'use client';
import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type InstagramPostData = {
  id: string;
  caption: string;
  media_url: string;
  permalink: string;
};

type InstagramBlockProps = {
  posts: InstagramPostData[];
  blockData: {
    first_caption: string;
    second_caption: string;
    third_caption: string;
    fourth_caption: string;
    fifth_caption: string;
    title: string;
    button_cta: string;
    button_href: string;
  };
};

const InstagramBlock: FC<InstagramBlockProps> = ({ posts, blockData }) => {
  return (
    <div className="flex flex-col py-96">
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="col-span-12">
            <h1 className="font-rufina sm:text-4xl text-3xl sm:leading-4xl leading-3xl text-center">
              {blockData.title}
            </h1>
          </div>
        </div>
        {posts.length > 0 && (
          <div className="grid grid-cols-12 gap-24  overflow-hidden mt-24">
            {posts[0]?.permalink && (
              <div className="lg:col-span-6 col-span-12 lg:block hidden">
                <Link
                  href={posts[0].permalink}
                  className="flex w-full lg:h-full h-[300px] relative rounded-xl overflow-hidden"
                >
                  <Image src={posts[0].media_url} alt={posts[0].caption} layout="fill" objectFit="cover" />
                </Link>
              </div>
            )}
            <div className="lg:col-span-6 col-span-12 mt-16">
              <div className="grid grid-cols-12 gap-24">
                {posts[1].permalink && (
                  <div className="lg:col-span-6 col-span-12 lg:block hidden">
                    <Link
                      href={posts[1].permalink}
                      className="flex w-full h-[300px] relative overflow-hidden"
                      target="_blank"
                    >
                      <Image
                        src={posts[1].media_url}
                        alt={posts[1].caption}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    </Link>
                  </div>
                )}
                {posts[2].permalink && (
                  <div className="lg:col-span-6 col-span-12">
                    <Link href={posts[2].permalink} className="flex w-full h-[300px] relative overflow-hidden">
                      <Image src={posts[2].media_url} alt={posts[2].caption} layout="fill" objectFit="cover" />
                    </Link>
                  </div>
                )}
                {posts[3].permalink && (
                  <div className="lg:col-span-6 col-span-12">
                    <Link href={posts[3].permalink} className="flex w-full h-[300px] relative overflow-hidden">
                      <Image src={posts[3].media_url} alt={posts[3].caption} layout="fill" objectFit="cover" />
                    </Link>
                  </div>
                )}
                {posts[4].permalink && (
                  <div className="lg:col-span-6 col-span-12">
                    <Link href={posts[4].permalink} className="flex w-full h-[300px] relative overflow-hidden">
                      <Image src={posts[4].media_url} alt={posts[4].caption} layout="fill" objectFit="cover" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstagramBlock;
