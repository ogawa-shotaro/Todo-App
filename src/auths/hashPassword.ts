import bcrypt from "bcrypt";

export const hashPassword = async (plainPassword: string) => {
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  return hashedPassword;
};
