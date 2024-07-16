'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';

const RichTextBlock = ({ content }: { content: BlocksContent }) => {
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        paragraph: ({ children }) => <p className="text-xl font-dmSans text-white-100 text-center m-0">{children}</p>,
        heading: ({ children, level }) => {
          switch (level) {
            case 1:
              return <h1 className="text-4xl font-rufina text-white-100 m-0">{children}</h1>;
            case 2:
              return <h2 className="text-3xl font-rufina text-white-100 m-0">{children}</h2>;
            case 3:
              return <h3 className="text-2xl font-rufina text-white-100 m-0">{children}</h3>;
            case 4:
              return <h4 className="text-xl font-rufina text-white-100 m-0">{children}</h4>;
            default:
              return <h1 className="pt-4 text-left font-rufina text-hover-blue text-400 mb-32">{children}</h1>;
          }
        },
        link: ({ children, url }) => <Link href={url}>{children}</Link>,
        image: ({ image }) => <Image src={image.url} alt={image.name} />,
      }}
      modifiers={{
        bold: ({ children }) => <strong>{children}</strong>,
        italic: ({ children }) => <span className="italic">{children}</span>,
      }}
    />
  );
};

export default RichTextBlock;
