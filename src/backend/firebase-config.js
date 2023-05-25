import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCEe90zyEnz-9jyilWZdSFb2eEmKEgqkr8",
  authDomain: "react-cart-2a8dd.firebaseapp.com",
  projectId: "react-cart-2a8dd",
  storageBucket: "react-cart-2a8dd.appspot.com",
  messagingSenderId: "345394818797",
  appId: "1:345394818797:web:4ca6efd3f424a6089466e4",
  measurementId: "G-CQQH9F306V",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore();
