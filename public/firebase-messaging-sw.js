// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
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

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
