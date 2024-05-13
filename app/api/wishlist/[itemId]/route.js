import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const maxDuration = 180;

const getCurrentUser = async () => {
  const currentUser = await JSON.parse(headers().get('currentUser'));
  if (!currentUser) redirect('/auth');
  return currentUser;
};

export async function DELETE(req, ctx) {
  try {
    const {
      params: { itemId },
    } = ctx;

    //const currentUser = await getCurrentUser();
    /* if (currentUser.uid !== userId) {
      console.log('Failed to GET user.');
      return NextResponse.json({ message: 'unauthorized' }, { status: 401 });
    } */

    await deleteDoc(doc(db, 'wishlist', itemId));

    console.log('Successfully called Next.js api: DELETE wishlist item.');
    return NextResponse.json({ message: 'ok' }, { status: 200 });
  } catch (error) {
    console.log('Failed to DELETE wishlist item.');
    console.log('error: ', error);
    return NextResponse.json({ message: 'internal server error' }, { status: 500 });
  }
}
