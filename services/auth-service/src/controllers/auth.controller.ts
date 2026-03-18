import type { Request, Response } from "express";
import bcrypt from "bcryptjs";

import { StatusCodes } from "../config/STATUS_CODES.js";
import { sendMail } from "../lib/mail.js";
import otpRepository from "../repository/otp.repository.js";
import userRepository from "../repository/user.repository.js";
import tokenRepository from "../repository/token.repository.js";
import { generateTokens } from "../helpers/tokens.js";

const sendOtp = async (req: Request, res: Response) => {
  try {
    console.log("req body : ", req.body);
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await userRepository.findUserByEmail(email);
    if (existingUser)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "User already exists", success: false });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = await otpRepository.createOtp({
      name,
      email,
      password: hashedPassword,
      role,
    });
    console.log("otp : ", otp);
    // await sendMail({ otp, email, name });

    return res.status(201).json({
      success: true,
      message: "User registered and OTP sent successfully",
      data: {
        name,
        email,
      },
    });
  } catch (error: any) {
    console.error("Signup error:", error.message);
    return res.status(StatusCodes.SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Email and OTP required" });

    const existingOtp = await otpRepository.existingOtp(email);

    if (!existingOtp)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "OTP not found" });

    if (existingOtp.isUsed)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "OTP already used" });

    if (existingOtp.expiresAt < new Date())
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "OTP expired" });

    if (existingOtp.attempts >= 5)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Too many attempts" });

    if (existingOtp.otp.toString() !== otp.toString()) {
      await otpRepository.updateOtp({ id: existingOtp.id });
      return res.status(400).json({ message: "Invalid OTP" });
    }

    await otpRepository.successOtp({ id: existingOtp.id });
    const user = await userRepository.createUser({
      name: existingOtp.tempName,
      password: existingOtp.tempPassword,
      email: existingOtp.email,
      role: existingOtp.tempRole,
    });

    const { accessToken, refreshToken } = generateTokens(user.id, user.role);
    await tokenRepository.createToken(refreshToken, user.id);

    return res.status(201).json({
      message: "User verified successfully",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    return res
      .status(StatusCodes.SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Email and password are required",
      });

    const user = await userRepository.findUserByEmail(email);
    if (!user)
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Invalid credentials",
      });

    if (!user.isVerified) {
      return res.status(StatusCodes.FORBIDDEN).json({
        success: false,
        message: "Please verify your email first",
      });
    }

    if (!user.isActive) {
      return res.status(StatusCodes.FORBIDDEN).json({
        success: false,
        message: "Account is deactivated",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const { accessToken, refreshToken } = generateTokens(user.id, user.role);
    await tokenRepository.createToken(refreshToken, user.id);

    return res.status(StatusCodes.SUCCESS).json({
      success: true,
      message: "Login successful",
      accessToken,
      refreshToken,
    });
  } catch (error: any) {
    console.error("Login error:", error.message);

    return res.status(StatusCodes.SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const me = async (req: Request, res: Response) => {
  try {
    // 1. Get userId from middleware
    const userId = req.user?.userId;

    if (!userId) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Unauthorized" });
    }

    // 2. Fetch user from DB
    const user = await userRepository.findUserById(userId);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    // 3. Send response
    return res.status(StatusCodes.SUCCESS).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error in /me:", error);
    return res
      .status(StatusCodes.SERVER_ERROR)
      .json({ message: "Something went wrong" });
  }
};

export default { sendOtp, login, verifyOtp, me };
