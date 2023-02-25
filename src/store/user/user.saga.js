import {all, call, put, takeLatest} from "redux-saga/effects";
import {USER_ACTION_TYPES} from "./user.types";
import {getCurrentUser, getOrCreateUserDocument} from "../../services/firebase/firebase.service";
import {signInFailed, signInSuccess} from "./user.action";

export const getSnapshotFromUserAuth = function* (userAuth, additionalInformation) {
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
        yield call(getSnapshotFromUserAuth, userAuth);
    } catch (e) {
        yield put(signInFailed(e));
    }
}

export const onCheckUserSession = function* () {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER, isUserAuthenticated)
}

export const userSagas = function* () {
    yield all([call(onCheckUserSession)]);
}