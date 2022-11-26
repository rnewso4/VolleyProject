// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-WkrGHrxuAh6se5gxrKQDLNC5rFk3iFU",
  authDomain: "volley-e415f.firebaseapp.com",
  projectId: "volley-e415f",
  storageBucket: "volley-e415f.appspot.com",
  messagingSenderId: "151482911045",
  appId: "1:151482911045:web:7504c4205562d22107962c",
  measurementId: "G-JJLBCFND3D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);