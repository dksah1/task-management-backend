import { Request, Response, NextFunction } from "express";

const asyncHandler =
  (fn: any) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch((error: any) => {
      res.status(500).json({ message: error.message });
    });

export default asyncHandler;
