import { configureStore } from "@reduxjs/toolkit";

import todoReducer from "@/features/todos/stores/todoSlice";
import toastReducer from "@/stores/toastSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    toast: toastReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
