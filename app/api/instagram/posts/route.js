import { NextResponse } from 'next/server';
import { Logger } from 'next-axiom';

export const maxDuration = 180;
export const dynamic = 'force-dynamic';

export async function GET(req) {
  const log = new Logger();
  console.log('Fetching Instagram posts...');
  try {
    const { INSTAGRAM_ACCESS_TOKEN } = process.env;
    if (!INSTAGRAM_ACCESS_TOKEN) {
      log.error('Instagram access token is not set.');
      await log.flush();
      return NextResponse.json({ message: 'fail' }, { status: 400 });
    }

    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=media_url,permalink,caption&access_token=${INSTAGRAM_ACCESS_TOKEN}`,
      { method: 'GET', headers: { 'Content-Type': 'application/json' } }
    );

    if (!response.ok) {
      log.error('Instagram API request failed.', { status: response.status });
      await log.flush();
      return NextResponse.json({ message: 'fail' }, { status: 400 });
    }

    const { data } = await response.json();
    console.log('Instagram posts fetched.', { count: data.length });

    log.info('Instagram posts fetched.', { count: data.length });
    await log.flush();
    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);
    log.error('Checkout process failed.', { error: error.message });
    await log.flush();
    return NextResponse.json({ message: 'fail' }, { status: 400 });
  }
}
