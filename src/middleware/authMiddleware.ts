import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler";
import User from "../models/user";
import { Request, Response, NextFunction } from "express";

interface JwtPayload {
  id: string;
}

const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as JwtPayload;

        const user = await User.findByPk(decoded.id);

        if (!user) {
          res.status(401);
          throw new Error("User not found");
        }

        // req.user = user;

        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error("Not authorized");
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);

export { protect };
