import { prisma } from "../lib/prisma.js";

const createToken = async (refreshToken: string, userId: string) => {
  return await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });
};

export default { createToken };
