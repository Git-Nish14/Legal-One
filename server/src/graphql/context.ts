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
  req: any;
  res: Response;
}

// Function to extract user from JWT
const getUserFromToken = (req: any): User | null => {
  try {
    const authHeader = req.headers.authorization as any;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null; // No token found
    }

    const token = authHeader.split(" ")[1] as any; // Extract Bearer Token
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
  req: any;
  res: Response;
}): Context => {
  return {
    prisma,
    user: getUserFromToken(req), // Attach authenticated user
    req,
    res,
  };
};
