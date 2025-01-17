import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyB5fe51z2AoZhLxEMLLR2_8HOQ3nf3ARQk",
    authDomain: "canteen-management-189be.firebaseapp.com",
    projectId: "canteen-management-189be",
    storageBucket: "canteen-management-189be.appspot.com",
    messagingSenderId: "1108240455",
    appId: "1:1108240455:web:c7e170709bbc3519b2a962",
    measurementId: "G-GMGTJFH3B4"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const messaging = getMessaging(app);

export { app, analytics, auth, messaging };
