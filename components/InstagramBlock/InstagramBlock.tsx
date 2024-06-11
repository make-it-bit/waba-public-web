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
};

const InstagramBlock: FC<InstagramBlockProps> = ({ posts }) => {
  return (
    <div className="flex flex-col py-96">
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="col-span-12">
            <h1 className="font-rufina sm:text-4xl text-3xl sm:leading-4xl leading-3xl text-center">
              Follow us on Instagram
            </h1>
          </div>
        </div>
        {posts.length > 0 && (
          <div className="grid grid-cols-12 gap-24  overflow-hidden mt-24">
            <div className="lg:col-span-6 col-span-12 lg:block hidden">
              <Link
                href={posts[0].permalink}
                className="flex w-full lg:h-full h-[300px] relative rounded-xl overflow-hidden"
              >
                <Image src={posts[0].media_url} alt={posts[0].caption} layout="fill" objectFit="cover" />
              </Link>
            </div>
            <div className="lg:col-span-6 col-span-12 mt-16">
              <div className="grid grid-cols-12 gap-24">
                <div className="lg:col-span-6 col-span-12 lg:block hidden">
                  <Link
                    href={posts[3].permalink}
                    className="flex w-full h-[300px] relative overflow-hidden"
                    target="_blank"
                  >
                    <Image
                      src={posts[3].media_url}
                      alt={posts[3].caption}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </Link>
                </div>
                <div className="lg:col-span-6 col-span-12">
                  <Link href={posts[9].permalink} className="flex w-full h-[300px] relative overflow-hidden">
                    <Image src={posts[9].media_url} alt={posts[9].caption} layout="fill" objectFit="cover" />
                  </Link>
                </div>
                <div className="lg:col-span-6 col-span-12">
                  <Link href={posts[8].permalink} className="flex w-full h-[300px] relative overflow-hidden">
                    <Image src={posts[8].media_url} alt={posts[8].caption} layout="fill" objectFit="cover" />
                  </Link>
                </div>
                <div className="lg:col-span-6 col-span-12">
                  <Link href={posts[6].permalink} className="flex w-full h-[300px] relative overflow-hidden">
                    <Image src={posts[6].media_url} alt={posts[6].caption} layout="fill" objectFit="cover" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstagramBlock;
