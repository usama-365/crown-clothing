// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from "firebase/auth";
import {collection, doc, getDoc, getDocs, getFirestore, query, setDoc, writeBatch} from "firebase/firestore";

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

export const addCollectionAndDocuments = async function (collectionKey, objectsToAdd) {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });
    await batch.commit();
}

export const getCategoriesAndDocuments = async function () {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
    // .reduce((acc, docSnapshot) => {
    //     const {title, items} = docSnapshot.data();
    //     acc[title.toLowerCase()] = items;
    //     return acc;
    // }, {});
};

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

export const signOutUser = async function () {
    await signOut(auth);
}

export const onAuthStateChangedListener = function (callback) {
    return onAuthStateChanged(auth, callback);
};