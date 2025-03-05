// Import the necessary functions from the Firebase SDKs
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Define the Firebase configuration object with the environment variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY, // API key for Firebase
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN, // Auth domain for Firebase Authentication
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID, // Project ID for Firebase
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET, // Storage bucket for Firebase Storage
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID, // Messaging sender ID for Firebase Cloud Messaging
  appId: process.env.REACT_APP_FIREBASE_APP_ID, // App ID for Firebase
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID, // Measurement ID for Firebase Analytics (optional)
};

// Initialize the Firebase app with the configuration object
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore (database service) and Auth (authentication service) instances
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

// Log a message to the console to confirm Firebase initialization
console.log("Firebase initialized:", firebaseApp.name);

// Export the Firestore and Auth instances for use in other parts of the application
export { db, auth };
