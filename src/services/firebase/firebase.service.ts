// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    NextOrObserver,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    User
} from "firebase/auth";
import {collection, doc, getDoc, getDocs, getFirestore, query, setDoc, writeBatch} from "firebase/firestore";
import {CategoryType} from "../../store/categories/categories.types";

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

export type AdditionalInformationType = {
    displayName?: string;
}

export const getOrCreateUserDocument = async function (user: User, additionalInformation = {} as AdditionalInformationType) {
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
    return userSnapshot;
}

export type ObjectToAdd = {
    title: string
};

export const addCollectionAndDocuments = async function <T extends ObjectToAdd>(collectionKey: string, objectsToAdd: T[]) {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });
    await batch.commit();
}

export const getCategoriesDocuments = async function (): Promise<CategoryType[]> {
    const collectionRef = collection(db, "categories");
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docSnapshot => docSnapshot.data() as CategoryType);
};

export const signInGoogle = async function () {
    const {user} = await signInWithPopup(auth, googleAuthProvider);
    await getOrCreateUserDocument(user);
    return user;
};

export const signUpEmailPassword = async function (displayName: string, email: string, password: string) {
    if (!email || !password) return;
    const {user} = await createUserWithEmailAndPassword(auth, email, password);
    await getOrCreateUserDocument(user, {displayName});
    return user;
}

export const signInEmailPassword = async function (email: string, password: string) {
    const {user} = await signInWithEmailAndPassword(auth, email, password);
    return user;
};

export const signOutUser = async function () {
    await signOut(auth);
}

export const onAuthStateChangedListener = function (callback: NextOrObserver<User>) {
    return onAuthStateChanged(auth, callback);
};

export const getCurrentUser = function (): Promise<User | null> {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            userAuth => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        );
    });
}