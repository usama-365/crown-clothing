import {getCategoriesDocuments} from "../../services/firebase/firebase.service";
import {fetchCategoriesFailed, fetchCategoriesSuccess} from "./categories.actions";
import {all, call, put, takeLatest} from "redux-saga/effects";
import {CATEGORIES_ACTION_TYPES} from "./categories.types";

export const fetchCategories = function* () {
    try {
        // @ts-ignore
        const categoriesArray = yield call(getCategoriesDocuments);
        yield put(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
        yield put(fetchCategoriesFailed(error as Error));
    }
}

export const onFetchCategoriesStart = function* () {
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategories);
};

export const categoriesSaga = function* () {
    yield all([call(onFetchCategoriesStart)]);
};