import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDA7afPCiWGiLkMzrcQdYHWvZnsh8o61N8",
  authDomain: "blogintern-e387c.firebaseapp.com",
  projectId: "blogintern-e387c",
  storageBucket: "blogintern-e387c.appspot.com",
  messagingSenderId: "1047407130497",
  appId: "1:1047407130497:web:8807959e3ed1a6d0dd1a80",
  measurementId: "G-M5QWCJHB1F"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export { auth };
