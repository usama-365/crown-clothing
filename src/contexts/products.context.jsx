import {SHOP_DATA} from '../shop-data.js';
import {addCollectionAndDocuments} from "../services/firebase/firebase.service";
import {createContext, useEffect, useState} from "react";

export const ProductsContext = createContext({
    products: [],
});

export const ProductsContextProvider = function ({children}) {
    const [products, setProducts] = useState([]);
    /*
    // Code snippet to synchronize the shop-data.js file with firestore
    useEffect(() => {
        addCollectionAndDocuments('categories', SHOP_DATA).then(() => console.log("Done"));
    }, []);
    */
    const value = { products };
    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
};