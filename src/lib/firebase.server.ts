import { FIREBASE_APIKEY, FIREBASE_AUTHDOMAIN } from '$env/static/private';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth/cordova';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: FIREBASE_APIKEY,
  authDomain: FIREBASE_AUTHDOMAIN,
  projectId: "ki-schreiben",
  storageBucket: "ki-schreiben.appspot.com",
  messagingSenderId: "83131531073",
  appId: "1:83131531073:web:c73a9133b9057a2eb22bc0",
  measurementId: "G-8T3DZXVCD7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const storage = getStorage(app);