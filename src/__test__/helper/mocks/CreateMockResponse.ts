import type { Response } from "express";

export const CreateMockResponse = (): Response => {
  const res: Response = {} as Response;

  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);

  return res;
};
