import { createSlice } from "@reduxjs/toolkit";

import { buildSignupExtraReducer } from "@/features/users/stores/reducers/signupReducer";
import { buildSigninExtraReducer } from "@/features/users/stores/reducers/signinReducer";
import { buildSignoutExtraReducer } from "@/features/users/stores/reducers/signoutReducer";
import type { AuthState } from "@/features/users/types/authTypes";

const initialState: AuthState = {
  inProgress: false,
  user: null,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    buildSignupExtraReducer(builder);
    buildSigninExtraReducer(builder);
    buildSignoutExtraReducer(builder);
  },
});

export default authSlice.reducer;
