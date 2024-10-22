import jwt from "jsonwebtoken";

const generateAccessToken = (userId: number): string => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
};

const generateRefreshToken = (userId: number): string => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
};

export { generateAccessToken, generateRefreshToken };
