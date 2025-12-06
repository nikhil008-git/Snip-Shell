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
    .min(1, "Username required")
    .trim(),

  email: z
    .string()
    .trim()
    .regex(/@/, "Email must contain @"), 

  password: z.string(), 
});

export const userSigninSchema = z.object({
  email: z
    .string()
    .trim()
    .regex(/@/, "Email must contain @"), 

  password: z.string(), 
});
