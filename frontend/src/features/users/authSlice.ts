import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "./types";
import { signup, buildSignupExtraReducer } from "./reducers/signup";

const initialState: AuthState = {
  signup: {
    inProgress: false,
    isSucceeded: false,
    error: null,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    buildSignupExtraReducer(builder);
  },
});

export { signup };
export default authSlice.reducer;
