import type { Role } from "@prisma/client";

interface ReqUser {
  userId?: string;
  role?: Role;
}
declare global {
  namespace Express {
    interface Request {
      user?: ReqUser;
    }
  }
}

export {};
