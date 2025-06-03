import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authReducer from '@/features/auth/authSlice';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import { productApi } from '@/service/product';

const rootConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'] 
}

const rootReducer = combineReducers({
  auth: authReducer,
  [productApi.reducerPath]: productApi.reducer
});

const persistedReducer = persistReducer(rootConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }).concat(logger, productApi.middleware),
});

export const persistor = persistStore(store);
