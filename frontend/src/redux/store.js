
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './storeSlices'; 

export const store = configureStore({
  reducer: {
    user: userReducer, 
  },
});
