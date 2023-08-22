import {categoriesSaga} from "./categories/categories.saga";
import {all, call} from "redux-saga/effects";
import {userSagas} from "./user/user.saga";

export const rootSaga = function* () {
    yield all([call(categoriesSaga), call(userSagas)]);
};