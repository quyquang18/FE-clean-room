// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: 'api-fribase.firebaseapp.com',
    projectId: 'api-fribase',
    storageBucket: 'api-fribase.appspot.com',
    messagingSenderId: '864730271378',
    appId: '1:864730271378:web:c50466b72f9a0e67c2604b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);
