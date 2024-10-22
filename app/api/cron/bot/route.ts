import { NextResponse } from 'next/server';
import { Logger } from 'next-axiom';

export const runtime = 'edge';

export async function GET() {
  const log = new Logger();

  try {
    await fetch('https://www.waba.health');

    log.info('Website (https://www.waba.health) fetched.');
    await log.flush();
    return NextResponse.json({ message: 'website fetched' }, { status: 200 });
  } catch (error) {
    log.error('Error fetching website (https://www.waba.health).', { error: error.message });
    await log.flush();
    return NextResponse.json({ message: 'error fetching website' }, { status: 400 });
  }
}
