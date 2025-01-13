import { createSlice } from "@reduxjs/toolkit";

interface ToastState {
  successMessage: string | null;
  errorMessage: string | null;
}

export const initialState: ToastState = {
  successMessage: null,
  errorMessage: null,
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    successToast: (state, action) => {
      state.successMessage = action.payload;
    },
    errorToast: (state, action) => {
      state.errorMessage = action.payload;
    },
    clearToast: (state) => {
      state.successMessage = null;
      state.errorMessage = null;
    },
  },
});

export const { successToast, errorToast, clearToast } = toastSlice.actions;
export default toastSlice.reducer;
