// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import userReducer from './userSlice';

// Configure the persist settings
const persistConfig = {
  key: 'root', // Key for localStorage
  storage, // Storage type (localStorage)
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
});

// Create a persistor for the store
const persistor = persistStore(store);

export  {store,persistor};
