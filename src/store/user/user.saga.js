import {all, call, put, takeLatest} from "redux-saga/effects";
import {USER_ACTION_TYPES} from "./user.types";
import {
    getCurrentUser,
    getOrCreateUserDocument,
    signInEmailPassword,
    signInGoogle,
    signOutUser,
    signUpEmailPassword
} from "../../services/firebase/firebase.service";
import {signInFailed, signInSuccess, signOutFailed, signOutSuccess, signUpFailed, signUpSuccess} from "./user.action";

export const saveUserAndPerformSignIn = function* (userAuth, additionalInformation) {
    try {
        const userSnapshot = yield call(getOrCreateUserDocument, userAuth, additionalInformation);
        yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
    } catch (e) {
        yield put(signInFailed(e));
    }
}
export const isUserAuthenticated = function* () {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;
        yield call(saveUserAndPerformSignIn, userAuth);
    } catch (e) {
        yield put(signInFailed(e));
    }
}

export const onCheckUserSession = function* () {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER, isUserAuthenticated)
}

export const signInWithGoogle = function* () {
    try {
        const user = yield call(signInGoogle());
        console.log(user);
        yield call(saveUserAndPerformSignIn, user);
    } catch (e) {
        yield put(signInFailed(e));
    }
}

export const onGoogleSignInStart = function* () {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export const signInWithEmail = function* ({payload: {email, password}}) {
    try {
        const user = yield call(signInEmailPassword, email, password);
        yield call(saveUserAndPerformSignIn, user);
    } catch (e) {
        yield put(signInFailed(e));
    }
}

export const onEmailSignInStart = function* () {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export const signUp = function* ({payload: {email, password, displayName}}) {
    try {
        const user = yield call(signUpEmailPassword, displayName, email, password);
        yield put(signUpSuccess(user, {displayName}));
    } catch (e) {
        yield put(signUpFailed(e));
    }
}

export const onSignUpStart = function* () {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export const signInAfterSignUp = function* ({payload: {user, additionalDetails}}) {
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
        yield put(signOutFailed(e));
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