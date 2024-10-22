import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import User from "../models/user";
import { generateAccessToken, generateRefreshToken } from "../utils/jwtUtils";
import bcrypt from "bcryptjs";

import Joi from "joi";

const registerSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const validateInput = (data: any) => {
  const { error } = registerSchema.validate(data);
  if (error) {
    throw new Error(error.details[0].message);
  }
};

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  console.log("Register request body:", req.body);

  validateInput(req.body);

  const userExists = await User.findOne({ where: { email } });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    isLoggedIn: false,
  });

  if (user) {
    if (user.isLoggedIn) {
      return res.status(400).json({ message: "User is already logged in" });
    }

    user.isLoggedIn = false;
    await user.save();

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      isLoggedIn: user.isLoggedIn,
      accessToken: generateAccessToken(user.id),
      refreshToken: generateRefreshToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters",
  }),
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { error } = loginSchema.validate(
    { email, password },
    { abortEarly: false }
  );
  if (error) {
    return res.status(400).json({
      message: "Validation error",
      details: error.details.map((detail) => detail.message),
    });
  }

  const user = await User.findOne({ where: { email } });

  if (user) {
    if (user.isLoggedIn) {
      return res.status(400).json({ message: "User is already logged in" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Invalid email or password! Try again." });
    }

    user.isLoggedIn = true;
    await user.save();

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Set the cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    return res.status(401).json({ message: "Invalid email or password" });
  }
});

const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.body;
  const user = await User.findByPk(id);

  if (user) {
    user.isLoggedIn = false;
    await user.save();
    res.status(200).json({ message: "Logged out successfully" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

export { registerUser, loginUser, logoutUser };
