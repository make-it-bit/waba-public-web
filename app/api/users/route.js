import { NextResponse } from 'next/server';

import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const maxDuration = 180;

export async function POST(req) {
  try {
    const formData = await req.formData();

    await setDoc(doc(db, 'users', formData.get('uid')), {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phoneNumber: formData.get('phoneNumber'),
      country: '',
      city: '',
      street: '',
      postalCode: '',
      createdAt: serverTimestamp(),
    });

    console.log('Successfully called Next.js api: POST users.');
    return NextResponse.json({ message: 'ok' }, { status: 200 });
  } catch (error) {
    console.log('Failed to POST user.');
    console.log('error: ', error);
    return NextResponse.json({ message: 'not ok' }, { status: 400 });
  }
}
