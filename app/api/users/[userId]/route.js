import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const maxDuration = 180;

const getCurrentUser = async () => {
  const currentUser = await JSON.parse(headers().get('currentUser'));
  if (!currentUser) redirect('/auth');
  return currentUser;
};

export async function GET(req, ctx) {
  try {
    const {
      params: { userId },
    } = ctx;

    //const currentUser = await getCurrentUser();
    /* if (currentUser.uid !== userId) {
      console.log('Failed to GET user.');
      return NextResponse.json({ message: 'unauthorized' }, { status: 401 });
    } */

    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Successfully called Next.js api: GET user.');
      return NextResponse.json({ data: docSnap.data() }, { status: 200 });
    } else {
      console.log('Failed to GET user.');
      return NextResponse.json({ message: 'not found' }, { status: 404 });
    }
  } catch (error) {
    console.log('Failed to GET user.');
    console.log('error: ', error);
    return NextResponse.json({ message: 'internal server error' }, { status: 500 });
  }
}

export async function PUT(req, ctx) {
  try {
    const formData = await req.formData();
    const {
      params: { userId },
    } = ctx;

    //const currentUser = await getCurrentUser();
    /* if (currentUser.uid !== userId) {
      console.log('Failed to GET user.');
      return NextResponse.json({ message: 'unauthorized' }, { status: 401 });
    } */

    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phoneNumber: formData.get('phoneNumber'),
      country: formData.get('country'),
      city: formData.get('city'),
      street: formData.get('street'),
      postalCode: formData.get('postalCode'),
    });

    console.log('Successfully called Next.js api: PUT user.');
    return NextResponse.json({ message: 'ok' }, { status: 200 });
  } catch (error) {
    console.log('Failed to UPDATE user.');
    console.log('error: ', error);
    return NextResponse.json({ message: 'internal server error' }, { status: 500 });
  }
}
