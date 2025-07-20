
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, RecaptchaVerifier } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR-API-KEY",
  authDomain: "YOUR-DOMAIN.firebaseapp.com",
  projectId: "YOUR-PROJECT-ID",
  storageBucket: "YOUR-BUCKET.appspot.com",
  messagingSenderId: "YOUR-ID",
  appId: "YOUR-APP-ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, GoogleAuthProvider, RecaptchaVerifier };
