// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0OQWrhgeX4rtIt0byXPCKFQfP3DHs2Mk",
  authDomain: "horta-inteligente-b7351.firebaseapp.com",
  projectId: "horta-inteligente-b7351",
  storageBucket: "horta-inteligente-b7351.firebasestorage.app",
  messagingSenderId: "999271842930",
  appId: "1:999271842930:web:8d6aa8dd581ecbfcd2eeeb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);