import { configureStore } from '@reduxjs/toolkit';
import CustomerReducer from './slices/customerSlice';
// import { api } from './slices/productSlice';

export const store = configureStore({
  reducer: {
    customers: CustomerReducer,
    // [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
