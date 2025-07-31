// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_Kw7rsufxAnMd9I_zvvukbbpmd88wO7w",
  authDomain: "viva-3e8a8.firebaseapp.com",
  projectId: "viva-3e8a8",
  storageBucket: "viva-3e8a8.firebasestorage.app",
  messagingSenderId: "114774962873",
  appId: "1:114774962873:web:2f7cf94367b007bcb9a168",
  measurementId: "G-7QNKYJCG8M",
};

// Initialize Firebase
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
