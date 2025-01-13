import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@/features/users/stores/authSlice";
import toastReducer from "@/features/users/stores/toastSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    toast: toastReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
