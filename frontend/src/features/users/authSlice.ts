import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "@/features/users/types";
import {
  signup,
  buildSignupExtraReducer,
} from "@/features/users/reducers/signup";

const initialState: AuthState = {
  signup: {
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
  },
});

export { signup };
export default authSlice.reducer;
