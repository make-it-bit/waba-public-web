import { NextResponse } from 'next/server';

const { EMAIL_VERIF_API_KEY } = process.env;

export async function POST(req) {
  if (!EMAIL_VERIF_API_KEY) {
    return NextResponse.json({ message: 'Missing ENV vars' }, { status: 400 });
  }
  const { email } = await req.json();
  const url = `https://apps.emaillistverify.com/api/verifyEmail?secret=${EMAIL_VERIF_API_KEY}&email=${encodeURIComponent(
    email
  )}&timeout=15`;
  try {
    const response = await fetch(url, { method: 'GET', headers: { 'Content-Type': 'text/html' } });
    const data = await response.text();
    return NextResponse.json({ message: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Email is not valid' }, { status: 400 });
  }
}
