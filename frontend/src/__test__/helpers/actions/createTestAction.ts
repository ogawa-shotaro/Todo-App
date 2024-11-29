import { PayloadAction } from "@reduxjs/toolkit";

export const createTestAction = <
  P = void,
  T extends string = string,
  M = never,
  E = never
>(
  type: T,
  payload: P,
  meta?: M,
  error?: E
): PayloadAction<P, T, M, E> => {
  return {
    type,
    payload,
    ...(meta !== undefined ? { meta } : {}),
    ...(error !== undefined ? { error } : {}),
  } as PayloadAction<P, T, M, E>;
};
