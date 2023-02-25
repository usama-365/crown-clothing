import {categoriesSaga} from "./categories/categories.saga";
import {all, call} from "redux-saga/effects";

export const rootSaga = function* () {
    yield all([call(categoriesSaga)]);
};