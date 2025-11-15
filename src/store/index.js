import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "@/features/auth/authSlice";
import chatReducer from "./chatSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import notificationReducer from "./notificationSlice";
// import logger from "redux-logger";
// import { productApi } from "@/services/product";

const rootConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // chỉ persist auth
};

const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
  notification: notificationReducer,
  // [productApi.reducerPath]: productApi.reducer
});

const persistedReducer = persistReducer(rootConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ Tắt kiểm tra serialize
    }),
  // .concat(logger, productApi.middleware) nếu cần
});

export const persistor = persistStore(store);
