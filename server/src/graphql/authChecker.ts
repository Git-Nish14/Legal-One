import { AuthChecker } from "type-graphql";
import { Context } from "./context";

import { Request } from "express";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: any;
  };
}

// Define role types
export type Role = "user" | "lawyer" | "admin";

// Custom AuthChecker function
export const authChecker: AuthChecker<Context> = ({ context }, roles) => {
  const { user } = context;

  // Check if user is logged in
  if (!user) {
    return false;
  }

  // If no specific roles are required, allow access to any logged-in user
  if (roles.length === 0) {
    return true;
  }

  // Check if the user has at least one required role
  return roles.includes(user.role);
};
