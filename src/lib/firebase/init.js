// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: process.env.PUBLIC_FIREBASE_API_KEY,
  // authDomain: process.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.PUBLIC_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.PUBLIC_FIREBASE_APP_ID,
  apiKey: "AIzaSyA8saR3HPc9HzOE-6XFw9KRTU-JeXaFzCk",
  authDomain: "latihan-20042.firebaseapp.com",
  projectId: "latihan-20042",
  storageBucket: "latihan-20042.firebasestorage.app",
  messagingSenderId: "1074192935442",
  appId: "1:1074192935442:web:35ae52bbc202bcc2c946cb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
