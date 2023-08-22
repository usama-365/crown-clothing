import {all, call, put, takeLatest} from "redux-saga/effects";
import {USER_ACTION_TYPES} from "./user.types";
import {
    AdditionalInformationType,
    getCurrentUser,
    getOrCreateUserDocument,
    signInEmailPassword,
    signInGoogle,
    signOutUser,
    signUpEmailPassword
} from "../../services/firebase/firebase.service";
import {
    EmailSignInStartType,
    signInFailed,
    signInSuccess,
    signOutFailed,
    signOutSuccess,
    signUpFailed, SignUpStartType,
    signUpSuccess, SignUpSuccessType
} from "./user.action";
import {User} from "firebase/auth";

export const saveUserAndPerformSignIn = function* (userAuth: User, additionalInformation?: AdditionalInformationType) {
    try {
        // @ts-ignore
        const userSnapshot = yield call(getOrCreateUserDocument, userAuth, additionalInformation);
        yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
    } catch (e) {
        yield put(signInFailed(e as Error));
    }
}
export const isUserAuthenticated = function* () {
    try {
        // @ts-ignore
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;
        yield call(saveUserAndPerformSignIn, userAuth);
    } catch (e) {
        yield put(signInFailed(e as Error));
    }
}

export const onCheckUserSession = function* () {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER, isUserAuthenticated)
}

export const signInWithGoogle = function* () {
    try {
        // @ts-ignore
        const user = yield call(signInGoogle);
        console.log(user);
        yield call(saveUserAndPerformSignIn, user);
    } catch (e) {
        yield put(signInFailed(e as Error));
    }
}

export const onGoogleSignInStart = function* () {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export const signInWithEmail = function* ({payload: {email, password}}: EmailSignInStartType) {
    try {
        // @ts-ignore
        const user = yield call(signInEmailPassword, email, password);
        yield call(saveUserAndPerformSignIn, user);
    } catch (e) {
        yield put(signInFailed(e as Error));
    }
}

export const onEmailSignInStart = function* () {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export const signUp = function* ({payload: {email, password, displayName}}: SignUpStartType) {
    try {
        // @ts-ignore
        const user = yield call(signUpEmailPassword, displayName, email, password);
        yield put(signUpSuccess(user, {displayName}));
    } catch (e) {
        yield put(signUpFailed(e as Error));
    }
}

export const onSignUpStart = function* () {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export const signInAfterSignUp = function* ({payload: {user, additionalDetails}}: SignUpSuccessType) {
    yield call(saveUserAndPerformSignIn, user, additionalDetails);
}

export const onSignUpSuccess = function* () {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export const signOut = function* () {
    try {
        yield call(signOutUser);
        yield put(signOutSuccess());
    } catch (e) {
        yield put(signOutFailed(e as Error));
    }
}

export const onSignOutStart = function* () {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export const userSagas = function* () {
    yield all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart)
    ]);
}