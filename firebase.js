import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBzSL5YOSuba2qQ4dkaY-0Y4MWb4mTo-pI",
  authDomain: "foodbridge-20f43.firebaseapp.com",
  projectId: "foodbridge-20f43",
  storageBucket: "foodbridge-20f43.firebasestorage.app",
  messagingSenderId: "484860939564",
  appId: "1:484860939564:web:62dd70e5995ff67ed2b089"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

