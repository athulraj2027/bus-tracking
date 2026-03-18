import type { Request, Response } from "express";

const getHealth = async (req: Request, res: Response) => {
  return res.json({ message: "Health check endpoint" });
};

export default { getHealth };
