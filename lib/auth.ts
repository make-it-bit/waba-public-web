import { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  /* , sendEmailVerification */
  signInWithEmailAndPassword,
  signOut,
  User,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from 'firebase/auth';

import { auth } from '@/lib/firebase';

export async function handleSignUp(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function handleSignIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function handleSignOut() {
  return signOut(auth);
}

export function getAuthenticatedUser() {
  const [user, setUser] = useState<User | null | false>(false);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => setUser(user));
  }, []);

  return user;
}

export async function handleSendPasswordResetEmail(email: string) {
  return sendPasswordResetEmail(auth, email);
}
