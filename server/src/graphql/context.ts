import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

// Initialize Prisma Client globally to prevent multiple instances
const prisma = new PrismaClient();

// Define User Type (Modify based on your DB model)
export interface User {
  id: string;
  role: "USER" | "LAWYER" | "ADMIN"; // Hardcoded role values
}

// Define Context Interface
export interface Context {
  prisma: PrismaClient;
  user?: User | null;
  req: Request;
  res: Response;
}

// Function to extract user from JWT
const getUserFromToken = (req: Request): User | null => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract Bearer Token
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as User;
    return decoded; // Return user data (id, email, etc.)
  } catch (error) {
    return null; // Invalid or expired token
  }
};

// Context Creator Function
export const context = ({
  req,
  res,
}: {
  req: Request;
  res: Response;
}): Context => {
  return {
    prisma,
    user: getUserFromToken(req), // Attach authenticated user
    req,
    res,
  };
};
