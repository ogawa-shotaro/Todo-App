import { createSlice } from "@reduxjs/toolkit";

import { buildSignupExtraReducer } from "@/features/users/stores/reducers/signupReducer";
import { buildSigninExtraReducer } from "./reducers/signinReducer";
import { buildSignoutExtraReducer } from "@/features/users/stores/reducers/signoutReducer";
import { buildUserAuthorizationExtraReducer } from "@/features/users/stores/reducers/authUserReducer";
import { buildUpdateUserExtraReducer } from "@/features/users/stores/reducers/updateUserReducer";
import type { AuthState } from "@/features/users/types/authTypes";

const initialState: AuthState = {
  inProgress: false,
  user: null,
  isUserUpdateAuthorized: false,
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
    buildUserAuthorizationExtraReducer(builder);
    buildUpdateUserExtraReducer(builder);
  },
});

export default authSlice.reducer;
