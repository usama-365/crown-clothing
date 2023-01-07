// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDjvxq3vITJvPh2ElvT-lWbCg8Zovwt5FI",
    authDomain: "crown-clothing-cbca0.firebaseapp.com",
    projectId: "crown-clothing-cbca0",
    storageBucket: "crown-clothing-cbca0.appspot.com",
    messagingSenderId: "922956566280",
    appId: "1:922956566280:web:8a4f932b1548198545a6bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Google Auth
const provider = new GoogleAuthProvider();
// Customize the behaviour of provider
provider.setCustomParameters({
    // Force the user to select account
    prompt: "select_account"
});

// Export authentication instance and signInWithGooglePopup
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);