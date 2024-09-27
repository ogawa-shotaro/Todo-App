import { Response } from "express";

import { AuthenticatedRequest } from "../../types/users/UserAuthRequest.type";

export const getUserData = (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user;
  if (!userId) {
    return res.status(400).json({ message: "User ID not found" });
  }

  // userId を使って何かしらの処理を行う
  res.status(200).json({ message: `User data for userId: ${userId}` });
};
