import generateOtp from "../helpers/generateOtp.js";
import { prisma } from "../lib/prisma.js";
import type { CreateOtp } from "../types/repository.js";

const createOtp = async (data: CreateOtp) => {
  const { name, email, password, role } = data;
  const otp = generateOtp();
  const otpExpiryMinutes = 5;
  const expiresAt = new Date(Date.now() + otpExpiryMinutes * 60 * 1000);

  const createdOtp = await prisma.otp.create({
    data: {
      email,
      otp,
      expiresAt,
      tempName: name,
      tempPassword: password,
      tempRole: role,
    },
  });
  return createdOtp;
};

const existingOtp = async (data: { email: string }) => {
  const { email } = data;
  const existingOtp = await prisma.otp.findFirst({
    where: { email },
    orderBy: { createdAt: "desc" },
  });

  return existingOtp;
};

const updateOtp = async (data: { id: string }) => {
  const { id } = data;
  return await prisma.otp.update({
    where: { id },
    data: { attempts: { increment: 1 } },
  });
};

const successOtp = async (data: { id: string }) => {
  const { id } = data;
  return await prisma.otp.update({
    where: { id },
    data: { isUsed: true },
  });
};

export default { createOtp, existingOtp, updateOtp, successOtp };
