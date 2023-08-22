import {Action, ActionWithPayload, createAction, withMatcher} from "../utils";
import {CATEGORIES_ACTION_TYPES, CategoryType} from "./categories.types";

export type FetchCategoryStartType = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;
export type FetchCategoriesSuccessType = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, CategoryType[]>;
export type FetchCategoriesFailedType = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>

export const fetchCategoriesStart = withMatcher((): FetchCategoryStartType => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START));

export const fetchCategoriesSuccess = withMatcher((categories: CategoryType[]): FetchCategoriesSuccessType => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories));

export const fetchCategoriesFailed = withMatcher((error: Error): FetchCategoriesFailedType => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error));