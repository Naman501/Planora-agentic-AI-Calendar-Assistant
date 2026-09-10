import { Request, Response, NextFunction,Router } from "express";
import { descopeClient } from "../config/descope.js";
import { ensureUser } from "../repository/user.repository.js";

const router=Router()
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

    //user check

    const user = await ensureUser({ authUserId,email });

    // add auth info in req object
    req.auth = {
      authUserId,
      email,
      name: typeof claims.name === "string" ? claims.name : undefined,
      userId: user.id,
      token: claims,
    };
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({
      message: "Session Expired.",
      error: error,
    });
    throw new Error("Authentication Error!");
  }
}

