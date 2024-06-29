import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
// import thunkMiddleware from 'redux-thunk';

export const store = configureStore({
  reducer: {
    authReducer,
  },
});
