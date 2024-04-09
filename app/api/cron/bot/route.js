// import { NextResponse } from 'next/server';
import { Logger } from 'next-axiom';

export async function GET(req) {
  const log = new Logger();

  try {
    await fetch('http://wabaskin.com');

    log.info('Website (http://wabaskin.com) fetched.');
    await log.flush();
    return Response.json({ message: 'website fetched' }, { status: 200 });
  } catch (error) {
    log.error('Error fetching website (http://wabaskin.com).', { error: error.message });
    await log.flush();
    return Response.json({ message: 'error fetching website' }, { status: 400 });
  }
}
