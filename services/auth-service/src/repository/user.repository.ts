import { prisma } from "../lib/prisma.js";
import type { CreateOtp } from "../types/repository.js";

const createUser = async (data: CreateOtp) => {
  const { name, email, password, role } = data;
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
      role,
      isVerified: true,
    },
  });

  return user;
};

const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

const findUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      role: true,
      createdAt: true,
    },
  });
};

export default { createUser, findUserByEmail, findUserById };
