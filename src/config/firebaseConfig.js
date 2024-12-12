// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9xjXEjvRum5msDVhjZFQwKotL9_YM64M",
  authDomain: "habitapp-d5155.firebaseapp.com",
  projectId: "habitapp-d5155",
  storageBucket: "habitapp-d5155.firebasestorage.app",
  messagingSenderId: "861867771680",
  appId: "1:861867771680:web:bb9715d01026da83fd7945"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;