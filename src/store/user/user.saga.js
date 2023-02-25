import {all, call, takeLatest} from "redux-saga/effects";
import {USER_ACTION_TYPES} from "./user.types";
import {getCurrentUser} from "../../services/firebase/firebase.service";

export const isUserAuthenticated = function* () {
    try {
        const userAuth = yield call(getCurrentUser);
    } catch (e) {

    }
}

export const onCheckUserSession = function* () {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER)
}

export const userSagas = function* () {
    yield all([]);
}