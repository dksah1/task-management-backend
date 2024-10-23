import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler";
import User from "../database/models/user";
import { Request, Response, NextFunction } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: InstanceType<typeof User>;
  }
}

interface JwtPayload {
  id: number;
}

const auth = asyncHandler(
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
          process.env.JWT_SECRET!
        ) as JwtPayload;

        const user = await User.findByPk(decoded.id);

        if (!user) {
          res.status(401);
          throw new Error("User not authenticated");
        }

        req.user = user;

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

export { auth };
