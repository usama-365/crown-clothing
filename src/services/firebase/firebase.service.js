// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup
} from "firebase/auth";
import {doc, getDoc, getFirestore, setDoc} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDjvxq3vITJvPh2ElvT-lWbCg8Zovwt5FI",
    authDomain: "crown-clothing-cbca0.firebaseapp.com",
    projectId: "crown-clothing-cbca0",
    storageBucket: "crown-clothing-cbca0.appspot.com",
    messagingSenderId: "922956566280",
    appId: "1:922956566280:web:8a4f932b1548198545a6bd"
};

// Initialize firebase, firestore and authentication
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Creating google auth provider
const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({
    prompt: "select_account"
});

const getOrCreateUserDocument = async function (user, additionalInformation = {}) {
    if (!user) return;
    const userDocRef = doc(db, "users", user.uid)
    const userSnapshot = await getDoc(userDocRef);
    // If the user doesn't exist in database, create it
    if (!userSnapshot.exists()) {
        const {displayName, email} = user;
        const createdAt = new Date();
        await setDoc(userDocRef, {displayName, email, createdAt, ...additionalInformation});
    }
    // Return the user doc reference
    return userDocRef;
}

export const signInGoogle = async function () {
    const {user} = await signInWithPopup(auth, googleAuthProvider);
    await getOrCreateUserDocument(user);
    return user;
};

export const signUpEmailPassword = async function (displayName, email, password) {
    if (!email || !password) return;
    const {user} = await createUserWithEmailAndPassword(auth, email, password);
    await getOrCreateUserDocument(user, {displayName});
    return user;
}

export const signInEmailPassword = async function (email, password) {
    const {user} = await signInWithEmailAndPassword(auth, email, password);
    return user;
};