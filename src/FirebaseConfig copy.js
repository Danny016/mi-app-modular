// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIPZKDysMBbnF5-Eqiai5QRGKMwq_254E",
  authDomain: "mi-app-react-demo.firebaseapp.com",
  projectId: "mi-app-react-demo",
  storageBucket: "mi-app-react-demo.firebasestorage.app",
  messagingSenderId: "1053314086618",
  appId: "1:1053314086618:web:c19fb42926ecd077a317e3",
  measurementId: "G-KE3HMYBM1K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getAnalytics(app);

export { db };