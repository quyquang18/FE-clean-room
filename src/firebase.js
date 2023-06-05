// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import 'firebase/compat/messaging';

// // // TODO: Add SDKs for Firebase products that you want to use
// // // https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: process.env.FIREBASE_API_KEY,
//     authDomain: 'fir-clean-room.firebaseapp.com',
//     databaseURL: 'https://fir-clean-room-default-rtdb.asia-southeast1.firebasedatabase.app',
//     projectId: 'fir-clean-room',
//     storageBucket: 'fir-clean-room.appspot.com',
//     messagingSenderId: '552996116920',
//     appId: '1:552996116920:web:54a124a509ccf35e3e174d',
// };


const firebaseConfig = {
    apiKey: 'AIzaSyCCRwQC2cAvZkF8ieO4GDqvI3BeiDXx_4E',
    authDomain: 'fir-clean-room.firebaseapp.com',
    databaseURL: 'https://fir-clean-room-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'fir-clean-room',
    storageBucket: 'fir-clean-room.appspot.com',
    messagingSenderId: '552996116920',
    appId: '1:552996116920:web:54a124a509ccf35e3e174d',
    measurementId: 'G-SRL6TYLZN8',
};

//  firebase.initializeApp(firebaseConfig);
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);
