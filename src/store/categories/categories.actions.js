import {createAction} from "../utils";
import {CATEGORIES_ACTION_TYPES} from "./categories.types";
import {getCategoriesDocuments} from "../../services/firebase/firebase.service";

export const fetchCategoriesStart = () => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = categories => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories);

export const fetchCategoriesFailed = error => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

export const fetchCategoriesAsync = () => async (dispatch) => {
    dispatch(fetchCategoriesStart());
    getCategoriesDocuments()
        .then(categories => dispatch(fetchCategoriesSuccess(categories)))
        .catch(error => dispatch(fetchCategoriesFailed(error)));
}