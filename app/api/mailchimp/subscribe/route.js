import { NextResponse } from 'next/server';
import { Logger } from 'next-axiom';

import addSubscriber from '../../../../utils/mailchimp';

export async function POST(req) {
  const log = new Logger();
  const { email } = await req.json();
  try {
    log.info('Adding subscriber to Mailchimp', { email });
    await log.flush();
    await addSubscriber(email);
    log.info('Subscriber added to Mailchimp', { email });
    await log.flush();
    return NextResponse.json({ message: 'OK' }, { status: 200 });
  } catch (error) {
    log.error('Error adding subscriber to Mailchimp', { error: error.message, stack: error.stack });
    await log.flush();
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
