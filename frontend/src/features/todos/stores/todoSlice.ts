import { createSlice } from "@reduxjs/toolkit";

import { buildCreateTodoExtraReducer } from "@/features/todos/stores/reducers/createTodoReducer";
import type { TodoState } from "@/features/todos/types/todoTypes";

const initialState: TodoState = {
  inProgress: false,
  todo: null,
  isModalOpen: false,
  status: "waiting",
  error: null,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    setWaiting: (state) => {
      state.status = "waiting";
    },
    setWorking: (state) => {
      state.status = "working";
    },
    setPending: (state) => {
      state.status = "pending";
    },
    setDiscontinued: (state) => {
      state.status = "discontinued";
    },
    setCompleted: (state) => {
      state.status = "completed";
    },
  },
  extraReducers(builder) {
    buildCreateTodoExtraReducer(builder);
  },
});

export const {
  openModal,
  closeModal,
  setWaiting,
  setWorking,
  setPending,
  setDiscontinued,
  setCompleted,
} = todoSlice.actions;

export default todoSlice.reducer;
