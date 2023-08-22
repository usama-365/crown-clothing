import {Action, ActionWithPayload, createAction, withMatcher} from "../utils";
import {USER_ACTION_TYPES} from "./user.types";
import {User} from "firebase/auth";
import {AdditionalInformationType} from "../../services/firebase/firebase.service";

export type SetCurrentUserType = ActionWithPayload<USER_ACTION_TYPES.SET_CURRENT_USER, User>;
export type CheckUserSessionType = Action<USER_ACTION_TYPES.CHECK_USER>;
export type GoogleSignInStartType = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>;
export type EmailSignInStartType = ActionWithPayload<USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {
    email: string,
    password: string
}>
export type SignInSuccessType = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_SUCCESS, User>;
export type SignInFailedType = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_FAILED, Error>;
export type SignUpStartType = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_START, {
    password: string,
    email: string,
    displayName: string
}>;
export type SignUpSuccessType = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_SUCCESS, {
    user: User,
    additionalDetails: AdditionalInformationType
}>
export type SignUpFailedType = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_FAILED, Error>;
export type SignOutStartType = Action<USER_ACTION_TYPES.SIGN_OUT_START>;
export type SignOutSuccessType = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>;
export type SignOutFailedType = ActionWithPayload<USER_ACTION_TYPES.SIGN_OUT_FAILED, Error>;

export const setCurrentUser = withMatcher((user: User): SetCurrentUserType => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));

export const checkUserSession = withMatcher((): CheckUserSessionType => createAction(USER_ACTION_TYPES.CHECK_USER));

export const googleSignInStart = withMatcher((): GoogleSignInStartType => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START));

export const emailSignInStart = withMatcher((email: string, password: string): EmailSignInStartType => createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {
    email,
    password
}));

export const signInSuccess = withMatcher((user: User): SignInSuccessType => createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user));

export const signInFailed = withMatcher((error: Error): SignInFailedType => createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error));

export const signUpStart = withMatcher((email: string, password: string, displayName: string): SignUpStartType => createAction(USER_ACTION_TYPES.SIGN_UP_START, {
    email,
    password,
    displayName
}));

export const signUpSuccess = withMatcher((user: User, additionalDetails: AdditionalInformationType): SignUpSuccessType => createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, {
    user,
    additionalDetails
}));

export const signUpFailed = withMatcher((error: Error): SignUpFailedType => createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error));

export const signOutStart = withMatcher((): SignOutStartType => createAction(USER_ACTION_TYPES.SIGN_OUT_START));

export const signOutSuccess = withMatcher((): SignOutSuccessType => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS));

export const signOutFailed = withMatcher((error: Error): SignOutFailedType => createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error));
