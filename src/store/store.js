import {configureStore} from "@reduxjs/toolkit";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from "redux-persist";
import {rootReducer} from "./root-reducer";
import createSagaMiddleware from "redux-saga";
import {rootSaga} from "./rootSaga";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["cart"],
}

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => (
        process.env.NODE_ENV === "development" ?
            getDefaultMiddleware({
                serializableCheck: false,
                immutableCheck: false,
                thunk: true
            }).concat(sagaMiddleware).concat(logger)
            :
            getDefaultMiddleware({
                serializableCheck: false,
                immutableCheck: false,
                thunk: true
            }).concat(sagaMiddleware)
    )
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);