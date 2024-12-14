import { createSlice } from "@reduxjs/toolkit";

import { buildSignupExtraReducer } from "@/features/users/stores/reducers/signupReducer";
import { buildSigninExtraReducer } from "@/features/users/stores/reducers/signinReducer";
import type { AuthState } from "@/features/users/types/authTypes";

export const initialState: AuthState = {
  auth: {
    inProgress: false,
    isSucceeded: false,
    error: null,
  },
  user: {
    name: "",
    email: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    buildSignupExtraReducer(builder);
    buildSigninExtraReducer(builder);
  },
});

export default authSlice.reducer;
