import type { NextFunction, Request, Response } from "express";

export async function errorMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  return;
}
