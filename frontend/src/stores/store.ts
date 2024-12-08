import { configureStore } from "@reduxjs/toolkit";

import signupReducer from "@/features/users/stores/signupSlice";

export const store = configureStore({
  reducer: {
    auth: signupReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
