import { configureStore } from "@reduxjs/toolkit";

import signupReducer from "@/features/users/stores/signupSlice";
import signinReducer from "@/features/users/stores/signinSlice";

export const store = configureStore({
  reducer: {
    signup: signupReducer,
    signin: signinReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
