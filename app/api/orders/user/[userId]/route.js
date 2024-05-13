import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { query, collection, where, getDocs } from 'firebase/firestore';
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

    const customQuery = query(collection(db, 'orders'), where('uid', '==', userId));
    const querySnap = await getDocs(customQuery).then((querySnap) => {
      let data = [];
      querySnap.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      return data;
    });
    querySnap.map((doc) => {
      doc.date = doc.date.toDate().toLocaleString();
    });

    console.log('Successfully called Next.js api: GET orders.');
    return NextResponse.json({ data: querySnap }, { status: 200 });
  } catch (error) {
    console.log('Failed to GET orders.');
    console.log('error: ', error);
    return NextResponse.json({ message: 'internal server error' }, { status: 500 });
  }
}
