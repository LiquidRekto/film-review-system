import bcrypt from "bcrypt";

export const hashPassword = async (data: string) => {
  return await bcrypt.hash(data, 10);
};

export const comparePassword = async (data: string, hashed_data: string) => {
  return await bcrypt.compare(data, hashed_data);
};
