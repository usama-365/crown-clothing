import {User} from "firebase/auth";
import {AnyAction} from "redux";
import {signInFailed, signInSuccess, signOutFailed, signOutSuccess, signUpFailed} from "./user.action";

export type UserStateType = {
    readonly currentUser: User | null,
    readonly isLoading: boolean,
    readonly error: Error | null
}

const INITIAL_STATE: UserStateType = {
    currentUser: null,
    isLoading: false,
    error: null
};

export const userReducer = function (state = INITIAL_STATE, action: AnyAction) {
    if (signInSuccess.match(action)) {
        return {...state, currentUser: action.payload};
    } else if (signOutSuccess.match(action)) {
        return {...state, currentUser: null}
    } else if (signOutFailed.match(action) || signUpFailed.match(action) || signInFailed.match(action)) {
        return {...state, error: action.payload};
    } else {
        return state;
    }
}