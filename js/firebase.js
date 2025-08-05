import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBfDdmyzad26fqX9iSyelEYdm8268PbgQY",
  authDomain: "sports-buddy-e569a.firebaseapp.com",
  projectId: "sports-buddy-e569a",
  storageBucket: "sports-buddy-e569a.firebasestorage.app",
  messagingSenderId: "241282433797",
  appId: "1:241282433797:web:42d5796aff5bc44b1b2d6c",
  measurementId: "G-G95RYMSV3D"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };