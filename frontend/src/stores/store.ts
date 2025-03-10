import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@/features/users/stores/authSlice";
import todoReducer from "@/features/todos/stores/todoSlice";
import toastReducer from "@/stores/toastSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todo: todoReducer,
    toast: toastReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
