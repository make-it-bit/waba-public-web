import { NextResponse } from 'next/server';

import addSubscriber from '../../../../utils/mailchimp';

export async function POST(req) {
  const { email } = await req.json();
  try {
    await addSubscriber(email);
    return NextResponse.json({ message: 'OK' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
