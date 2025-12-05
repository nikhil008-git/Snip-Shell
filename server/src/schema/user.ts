import * as z from "zod";

// signup type  
export type SignupInput = {
  username: string;
  email: string;
  password: string;
};

// signin type
export type SigninInput = {
  email: string;
  password: string;
};

export const userSignupSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(40, "Username too long")
    .trim(),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"), // looser
});

export const userSigninSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email"),

  password: z.string().min(1, "Password required"),
});
