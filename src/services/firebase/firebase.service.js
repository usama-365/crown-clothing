// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {getFirestore, doc, getDoc, setDoc} from "firebase/firestore";

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

// Firestore
const db = getFirestore(app);

export const getOrCreateUserDocument = async function (user) {
    const userDocRef = doc(db, 'users', user.uid)
    const userSnapshot = await getDoc(userDocRef);
    // If the user doesn't exist in database, create it
    if (!userSnapshot.exists()) {
        const { displayName, email } = user;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {displayName, email, createdAt});
        } catch (error) {
            console.log("Error creating the user")
        }
    }
    // Return the user doc reference
    return userDocRef;
}
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);