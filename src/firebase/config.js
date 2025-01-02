import {initializeApp, getApps} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
const currentApps = getApps();
let firebaseAuth;
let storage;
let firestore;

if (!currentApps.length) {
    const app = initializeApp(firebaseConfig);
    firebaseAuth = getAuth(app);
    storage = getStorage(app);
    firestore = getFirestore(app);
} else {
    const app = currentApps[0];
    firebaseAuth = getAuth(app);
    storage = getStorage(app);
    firestore = getFirestore(app);
}

export {firebaseAuth, storage, firestore};