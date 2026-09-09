import { Request, Response, NextFunction } from "express";
import { descopeClient } from "../config/descope.js";

export type AuthContext = {
  authUserId: string;
  email?: string;
  name?: string;
  userId?: string;
  token: Record<string, unknown>;
};

declare global {
  namespace Express {
    interface Request {
      auth?: AuthContext;
    }
  }
}

export async function requireSession(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ")
    ? header.slice("Bearer ".length).trim()
    : null;
  if (!token) {
    res.status(401).json({
      success: false,
      error: "Unauthorized",
    });
    return;
  }

  try {
    const authInfo = await descopeClient.validateSession(token);
    console.log("authInfo", authInfo);
    const claims = authInfo.token as Record<string, unknown>;
    console.log("claims", claims);
    const authUserId = String(claims.sub ?? "");
    console.log("authUserId", authUserId);
    if (!authInfo) {
      res.status(401).json({
        success: false,
        error: "Unauthorized, no authInfo.",
      });
      return;
    }
    const email = typeof claims.email === "string" ? claims.email : undefined;
    console.log("email", email);
  } catch (error) {
    console.error(error);
    throw new Error("Authentication Error!");
  }
}
