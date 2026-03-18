import type { Role } from "@prisma/client";

export type CreateOtp = {
  name: string;
  email: string;
  password: string;
  role: Role;
};

export type Login = { email: string; password: string };
