import React from 'react';

import { NextResponse } from 'next/server';
import { ImageResponse } from '@vercel/og';

import {
  OGLogo,
  OGEllipseSmaller,
  OGEllipseBigger,
  OGDeviceBlueLight,
  OGDeviceGreenLight,
} from '../../../components/OGElements';

export const runtime = 'edge';
export const maxDuration = 180;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') === '' ? 'Discover Liberating Beauty' : searchParams.get('title');
    const description =
      searchParams.get('desc') === ''
        ? 'Innovative light-based device that is more than just a skincare.'
        : searchParams.get('desc');

    const rufina = await fetch(new URL('../../../public/fonts/Rufina.ttf', import.meta.url)).then((res) =>
      res.arrayBuffer()
    );
    const dmSans = await fetch(new URL('../../../public/fonts/DMSans.ttf', import.meta.url)).then((res) =>
      res.arrayBuffer()
    );

    const deviceHead = await fetch(new URL('../../../public/device-head-og.png', import.meta.url)).then((res) =>
      res.arrayBuffer()
    );
    const deviceBody = await fetch(new URL('../../../public/device-body-og.png', import.meta.url)).then((res) =>
      res.arrayBuffer()
    );

    return new ImageResponse(
      (
        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
            backgroundImage:
              'radial-gradient(274.58% 111.02% at 85.12% 10%, rgba(151, 71, 255, 0.20) 0%, rgba(220, 197, 245, 0.00) 100%), linear-gradient(180deg, #EBE1F2 11.66%, rgba(235, 225, 242, 0.00) 100%)',
            color: '#07000E',
          }}
        >
          <OGEllipseSmaller />
          <OGEllipseBigger />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '120px',
              marginBottom: 'auto',
            }}
          >
            <OGLogo />
            <p
              style={{
                fontFamily: '"Rufina"',
                fontWeight: '400',
                fontSize: '72px',
                lineHeight: '120%',
                marginTop: '64px',
                marginBottom: '0px',
              }}
            >
              {title}
            </p>
            <p
              style={{
                fontFamily: '"DM Sans"',
                fontWeight: '400',
                fontSize: '24px',
                lineHeight: '190%',
                marginTop: '32px',
                marginBottom: '0px',
              }}
            >
              {description}
            </p>
          </div>
          <img
            width={181.92}
            height={130.181}
            src={deviceHead}
            alt="device head"
            style={{
              position: 'absolute',
              top: '490.1px',
            }}
          />
          <OGDeviceBlueLight />
          <img
            width={161.86}
            height={679.68}
            src={deviceBody}
            alt="device body"
            style={{
              position: 'absolute',
              top: '582.33px',
              left: '517.5px',
            }}
          />
          <OGDeviceGreenLight />
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Rufina',
            data: rufina,
            style: 'normal',
          },
          {
            name: 'DM Sans',
            data: dmSans,
            style: 'normal',
          },
        ],
      }
    );
  } catch (error) {
    console.log('Failed to generate og image.');
    console.log('error: ', error);

    return NextResponse.json({ message: 'fail' }, { status: 400 });
  }
}
