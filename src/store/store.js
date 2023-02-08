import {configureStore} from "@reduxjs/toolkit";import logger from "redux-logger";
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from "redux-persist";
import {rootReducer} from "./root-reducer";

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
        thunk: false
    }).concat(logger)
});

export const persistor = persistStore(store);