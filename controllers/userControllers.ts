import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const adminLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { email },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
      );

      res.status(200).json({
        success: true,
        message: "Login admin successful",
        token,
      });
      return;
    }

    res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
