import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBm8KjgC4lHyxQ9MR8eSj0YMDuRZdSlFh0",
    authDomain: "lab5-f3ac9.firebaseapp.com",
    projectId: "lab5-f3ac9",
    storageBucket: "lab5-f3ac9.appspot.com",
    messagingSenderId: "131064342989",
    appId: "1:131064342989:web:292de22da0082314c17c84",
    measurementId: "G-TY10KVL0WD"
  };

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

  export {db};