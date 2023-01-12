import {SHOP_DATA} from '../shop-data.js';
import {addCollectionAndDocuments, getCategoriesAndDocuments} from "../services/firebase/firebase.service";
import {createContext, useEffect, useState} from "react";

export const CategoriesContext = createContext({
    categories: {},
});

export const CategoriesContextProvider = function ({children}) {
    const [categories, setCategories] = useState({});
    /*
    // Code snippet to synchronize the shop-data.js file with firestore
    useEffect(() => {
        addCollectionAndDocuments('categories', SHOP_DATA).then(() => console.log("Done"));
    }, []);
    */

    useEffect(() => {
        getCategoriesAndDocuments().then(setCategories);
    }, []);

    const value = { categories };
    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    );
};