import {createContext, useEffect, useState} from "react";
import {onAuthStateChangedListener} from "../services/firebase/firebase.service";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const UserContextProvider = function ({children}) {
    const [currentUser, setCurrentUser] = useState(null);
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