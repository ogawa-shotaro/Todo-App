import { createSlice } from "@reduxjs/toolkit";

type ToastMessage = {
  text: string;
  type: "success" | "error";
};

export interface ToastState {
  message: ToastMessage | null;
}

export const initialState: ToastState = {
  message: null,
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action) => {
      state.message = action.payload;
    },
    clearToast: (state) => {
      state.message = null;
    },
  },
});

export const { showToast, clearToast } = toastSlice.actions;
export default toastSlice.reducer;
