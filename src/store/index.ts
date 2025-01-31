
import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import clientReducer from './slices/clientSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    clients: clientReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
