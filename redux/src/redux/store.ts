import { configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "./features/todoSlice";
import todoMiddleware, { crashReporter } from "./todoMiddleware";
import {} from "redux-persist";
import storage from "redux-persist/es/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import logger from "redux-logger";

const persistConfig = {
  key: "root",
  storage,
};

const persist = persistReducer(persistConfig, todoReducer);

export const store = configureStore({
  reducer: {
    todo: persist,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoMiddleware, crashReporter, logger),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
