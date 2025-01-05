import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const tokenReceived = req.headers.authorization;

    if (!tokenReceived) {
      res.status(401).json({ message: "Token is required" });
      return;
    }

    const token = tokenReceived.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Token is required" });
      return;
    }

    const secret = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;

    req.body.id = decoded.id;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: "Invalid or expired token" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const generateToken = (payload: { token: string }) => {
  const secret = process.env.JWT_SECRET!;
  const acessToken = jwt.sign(payload, secret);
  return acessToken;
};
