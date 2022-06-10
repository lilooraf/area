import * as dotenv from 'dotenv';
dotenv.config();

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const initializeFirebase = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyCSUakAVSpaKLwzoQCjKN-HkwegyYT8A4Q',
    authDomain: 'area-c11d8.firebaseapp.com',
    projectId: 'area-c11d8',
    storageBucket: 'area-c11d8.appspot.com',
    messagingSenderId: '726354417175',
    appId: '1:726354417175:web:4f295eb7f692e5f22eee52',
    measurementId: 'G-DVSQDYCGWS'
  };

  firebase.initializeApp(firebaseConfig);
  firebase.firestore();
  return firebase;
};

initializeFirebase();

export const getFirebase = () => firebase;
