import {createContext, useEffect, useReducer} from "react";
import {onAuthStateChangedListener} from "../services/firebase/firebase.service";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
};

const userReducer = function (state, action) {
    const {type, payload} = action;
    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            };
        default:
            throw new Error(`Unhandled action type provided to userReducer: ${type}`);
    }
}

const INITIAL_STATE = {
    currentUser: null
}

export const UserContextProvider = function ({children}) {
    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
    const {currentUser} = state;
    const setCurrentUser = (user) => {
        dispatch({type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user});
    }

    const value = {
        currentUser,
        setCurrentUser
    };

    useEffect(() => {
        return onAuthStateChangedListener((user) => {
            setCurrentUser(user);
        });
    }, []);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
