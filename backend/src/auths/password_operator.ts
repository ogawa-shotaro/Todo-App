import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPassword = async (plainPassword: string) => {
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

  return hashedPassword;
};
