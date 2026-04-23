
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; 
import projectReducer from "./projectSlice";
import { persistReducer, persistStore } from "redux-persist";


const manualStorage = {
  getItem: (key) => {
    return Promise.resolve(localStorage.getItem(key));
  },
  setItem: (key, value) => {
    localStorage.setItem(key, value);
    return Promise.resolve();
  },
  removeItem: (key) => {
    localStorage.removeItem(key);
    return Promise.resolve();
  }
};

const rootReducer = combineReducers({

    user: userReducer,
    project: projectReducer,

});

const persistConfig = {
  key: 'root',
  storage: manualStorage, 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
export default store;