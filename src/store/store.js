import {configureStore} from "@reduxjs/toolkit";
import {userReducer} from "./user/user.reducer";
import {categoriesReducer} from "./categories/categories.reducer";
import logger from "redux-logger";
import {cartReducer} from "./cart/cart.reducer";

export const store = configureStore({
    reducer: {
        // automatically calls combineReducer
        user: userReducer,
        categories: categoriesReducer,
        cart: cartReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
        thunk: false
    }).concat(logger)
});
