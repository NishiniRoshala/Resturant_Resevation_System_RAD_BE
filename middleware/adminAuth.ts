import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";

const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, ENV.JWT_SECRET) as string;

    if (decoded !== ENV.ADMIN_EMAIL + ENV.ADMIN_PASSWORD) {
      return res.status(403).json({
        success: false,
        message: "User is not authorized",
      });
    }

    next();
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: error.message || "Invalid token",
    });
  }
};

export default adminAuth;
