import {configureStore} from "@reduxjs/toolkit";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from "redux-persist";
import {rootReducer} from "./root-reducer";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["cart"],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => (
        process.env.NODE_ENV === "development" ?
            getDefaultMiddleware({
                serializableCheck: false,
                immutableCheck: false,
                thunk: true
            }).concat(logger)
            :
            getDefaultMiddleware({
                serializableCheck: false,
                immutableCheck: false,
                thunk: true
            })
    )
});

export const persistor = persistStore(store);