import * as z from "zod";
// signup typpee 
export type SignupInput = {
    username: string;
    email: string;
    password: string;
  };
  
  // signin typeee
  export type SigninInput = {
    email: string;
    password: string;
  };
  

export const userSignupSchema = z.object({
    username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters")
    .regex(/^[a-zA-Z0-9._]+$/, "Username can contain letters, numbers, . and _ only")
    .transform((s) => s.trim()),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
})

export const userSigninSchema = z.object({
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Invalid email address"),
  
    password: z.string().min(1, "Password is required"), 
  });

  
