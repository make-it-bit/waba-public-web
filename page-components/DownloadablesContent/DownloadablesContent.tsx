'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { RichTextBlock, DownloadableForm } from '@/components';
import { Button } from '@/gui-components/client';

import type { BlocksContent } from '@strapi/blocks-react-renderer';

import { getImageFullUrl_client } from '@/lib/getImgFullUrl';

type DownloadableContentProps = {
  content: {
    intro_title?: string;
    main_title: string;
    description: BlocksContent;
    button_cta: string;
    button_href?: string;
    bg_image: any;
    file: any;
  };
  form: {
    success_message: string;
    error_message: string;
    fields: {
      type: string;
      placeholder: string;
      field_name: string;
      validation_type: string;
      required: boolean;
    }[];
  };
};

const DownloadablesContent = ({ downloadableData }: { downloadableData: DownloadableContentProps }) => {
  const { content, form } = downloadableData;
  const {
    intro_title: introTitle,
    main_title: mainTitle,
    description,
    button_cta: buttonCta,
    button_href: buttonHref,
    bg_image: bgImage,
    file,
  } = content;

  return (
    <div className="relative w-screen h-screen">
      <Image src={getImageFullUrl_client(bgImage.data)} fill alt="Downloadables" className="object-cover" />
      <div className="container relative">
        <div className="grid grid-cols-12">
          <div className="lg:col-start-3 lg:col-span-8 col-span-12">
            <div className="flex flex-col lg:mt-104 lg-72 gap-48">
              {introTitle && <h4 className="text-3xl font-bold text-purple-40 text-center m-0">{introTitle}</h4>}
              <h1 className="text-4xl font-bold text-white-100 text-center m-0">{mainTitle}</h1>
              <RichTextBlock content={description} />
              {!file.data && !buttonHref && <DownloadableForm form={form} buttonCta={buttonCta} />}
              {file.data && (
                <Link href={getImageFullUrl_client(file.data)} target="_blank" className="self-center">
                  <Button CTA={buttonCta} style="primary" size="reg" />
                </Link>
              )}
              {buttonHref && !file.data && (
                <Link href={buttonHref} target="_blank" className="self-center">
                  <Button CTA={buttonCta} style="primary" size="reg" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadablesContent;
