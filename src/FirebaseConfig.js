// FirebaseConfig.js (versión actualizada)
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIPZKDysMBbnF5-Eqiai5QRGKMwq_254E",
  authDomain: "mi-app-react-demo.firebaseapp.com",
  projectId: "mi-app-react-demo",
  storageBucket: "mi-app-react-demo.firebasestorage.app",
  messagingSenderId: "1053314086618",
  appId: "1:1053314086618:web:c19fb42926ecd077a317e3",
  measurementId: "G-KE3HMYBM1K"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };