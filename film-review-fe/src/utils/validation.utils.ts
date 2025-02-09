import { z } from "zod";

export const ACCOUNT_REGISTER_SCHEMA = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    dob: z.string().min(1, "Date of birth is required"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
    username: z.string().min(4, "Username must be at least 4 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export const ACCOUNT_LOGIN_SCHEMA = z.object({
  username: z.string().min(1, "Username không được để trống"),
  password: z.string().min(1, "Password không được để trống"),
});
