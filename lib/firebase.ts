import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAwYaSQTUjT0jKtUH5SouIaUPA9ch_Mzqc',
  authDomain: 'waba-project-bd62b.firebaseapp.com',
  projectId: 'waba-project-bd62b',
  storageBucket: 'waba-project-bd62b.appspot.com',
  messagingSenderId: '163247618491',
  appId: '1:163247618491:web:443efc7b5ea6b9d24aac9e',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
