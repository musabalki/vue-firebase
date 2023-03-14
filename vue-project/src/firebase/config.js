import {initializeApp} from "firebase/app"
import {getAuth,signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD9qM6AMZ95CR69qs_wlA9My-pdQEjtRls",
  authDomain: "sosyal-13f2b.firebaseapp.com",
  projectId: "sosyal-13f2b",
  storageBucket: "sosyal-13f2b.appspot.com",
  messagingSenderId: "422004250177",
  appId: "1:422004250177:web:2e8eaf2b7ea7aa3ced58c0"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export {auth,db}