import type { Request, Response, NextFunction } from "express";

export const roleMiddleware = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized: No user found",
      });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({
        message: "Forbidden: Access denied",
      });
    }

    next();
  };
};
