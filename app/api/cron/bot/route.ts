import { NextResponse } from 'next/server';
import { Logger } from 'next-axiom';

export const runtime = 'edge';

export async function GET() {
  const log = new Logger();

  try {
    await fetch('http://wabaskin.com');

    log.info('Website (http://wabaskin.com) fetched.');
    await log.flush();
    return NextResponse.json({ message: 'website fetched' }, { status: 200 });
  } catch (error) {
    log.error('Error fetching website (http://wabaskin.com).', { error: error.message });
    await log.flush();
    return NextResponse.json({ message: 'error fetching website' }, { status: 400 });
  }
}
