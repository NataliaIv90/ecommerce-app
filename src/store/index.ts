import { configureStore } from '@reduxjs/toolkit';
import CustomerReducer from './slices/customerSlice';

export const store = configureStore({
  reducer: {
    customers: CustomerReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
