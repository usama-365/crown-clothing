import {all, call, put, takeLatest} from "redux-saga/effects";
import {USER_ACTION_TYPES} from "./user.types";
import {
    getCurrentUser,
    getOrCreateUserDocument,
    signInEmailPassword,
    signInGoogle
} from "../../services/firebase/firebase.service";
import {signInFailed, signInSuccess} from "./user.action";

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

export const userSagas = function* () {
    yield all([call(onCheckUserSession), call(onGoogleSignInStart), call(onEmailSignInStart)]);
}