import { NextResponse } from 'next/server';

const { EMAIL_VERIF_API_KEY } = process.env;

export async function POST(req) {
  if (!EMAIL_VERIF_API_KEY) {
    return NextResponse.json({ message: 'Missing ENV vars' }, { status: 400 });
  }
  const { email } = await req.json();
  try {
    const emailVerification = await fetch(
      `https://apps.emaillistverify.com/api/verifyEmail?secret=${EMAIL_VERIF_API_KEY}&email=${email}`
    );
    if (!emailVerification.ok) {
      return NextResponse.json({ message: 'fail' }, { status: 400 });
    }
    const emailVerificationData = await new Response(emailVerification.body).text();
    if (emailVerificationData !== 'ok') {
      return NextResponse.json({ message: 'fail' }, { status: 501 });
    }
    return NextResponse.json({ message: 'success' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Email is not valid' }, { status: 400 });
  }
}
