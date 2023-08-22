import {UserStateType} from "./user.reducer";
import {createSelector} from "@reduxjs/toolkit";
import {RootStateType} from "../store";

export const selectUserReducer = (state: RootStateType): UserStateType => state.user;

export const selectCurrentUser = createSelector(
    [selectUserReducer],
    (user) => user.currentUser
);