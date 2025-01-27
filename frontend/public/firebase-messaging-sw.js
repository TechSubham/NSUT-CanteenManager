// importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
// importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

// const firebaseConfig = {
//     apiKey: "AIzaSyB5fe51z2AoZhLxEMLLR2_8HOQ3nf3ARQk",
//     authDomain: "canteen-management-189be.firebaseapp.com",
//     projectId: "canteen-management-189be",
//     storageBucket: "canteen-management-189be.appspot.com",
//     messagingSenderId: "1108240455",
//     appId: "1:1108240455:web:c7e170709bbc3519b2a962",
//     measurementId: "G-GMGTJFH3B4"
// };

// firebase.initializeApp(firebaseConfig);

// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//     console.log("[firebase-messaging-sw.js] Received background message", payload);

//     const notificationTitle = payload.notification.title || "New Notification";
//     const notificationOptions = {
//         body: payload.notification.body || "You have a new message!",
//         icon: payload.notification.image || "/default-icon.png",
//     };

//     self.registration.showNotification(notificationTitle, notificationOptions);
// });
