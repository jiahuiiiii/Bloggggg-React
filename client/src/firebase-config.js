// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB9wWMmB3nm4CDzbFmaKZSjuNxI6Otmm1c',
  authDomain: 'blog-anes24.firebaseapp.com',
  projectId: 'blog-anes24',
  storageBucket: 'blog-anes24.appspot.com',
  messagingSenderId: '760013540352',
  appId: '1:760013540352:web:f1b316c11e60eff1515ce5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
