
import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import clientReducer from './slices/clientSlice';
import trainerReducer from './slices/trainerSlice';
import workoutClassReducer from './slices/workoutClassSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    clients: clientReducer,
    trainers: trainerReducer,
    workoutClass: workoutClassReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
