import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDR_eWmxM55pAMKuXUawmqwm52qThclhwI",
    authDomain: "ecommerce-site-f4b00.firebaseapp.com",
    projectId: "ecommerce-site-f4b00",
    storageBucket: "ecommerce-site-f4b00.firebasestorage.app",
    messagingSenderId: "961747502206",
    appId: "1:961747502206:web:b78edc0d0834c52acac42f",
    measurementId: "G-NM41WM6H4V"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
