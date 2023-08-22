import {CategoryType} from "./categories.types";
import {fetchCategoriesFailed, fetchCategoriesStart, fetchCategoriesSuccess} from "./categories.actions";
import {AnyAction} from "redux";

export type CategoriesStateType = {
    readonly categories: CategoryType[],
    readonly isLoading: boolean,
    readonly error: Error | null,
}

export const CATEGORIES_INITIAL_STATE: CategoriesStateType = {
    categories: [],
    isLoading: false,
    error: null
};

export function categoriesReducer(state = CATEGORIES_INITIAL_STATE, action = {} as AnyAction): CategoriesStateType {
    if (fetchCategoriesStart.match(action)) {
        return {...state, isLoading: true};
    } else if (fetchCategoriesSuccess.match(action)) {
        return {...state, categories: action.payload, isLoading: false};
    } else if (fetchCategoriesFailed.match(action)) {
        return {...state, error: action.payload, isLoading: false};
    }
    return state;
}