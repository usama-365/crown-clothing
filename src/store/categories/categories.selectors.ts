import {createSelector} from "@reduxjs/toolkit";
import {CategoriesStateType} from "./categories.reducer";
import {CategoryMapType} from "./categories.types";
import {RootStateType} from "../store";

const selectCategoryReducer = (state: RootStateType): CategoriesStateType => state.categories;

export const selectCategories = createSelector(
    [selectCategoryReducer],
    categoriesSlice => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories): CategoryMapType => categories.reduce((acc, category) => {
        const {title, items} = category;
        acc[title.toLowerCase()] = items;
        return acc;
    }, {} as CategoryMapType)
)

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    categoriesSlice => categoriesSlice.isLoading
);