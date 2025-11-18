import { z } from "zod";

export const SignUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  companyname: z.string().min(1, "Company Name is required"),
  email: z.string().email("Enter valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmpassword: z.string().min(1, "Confirm Password is required"),
}).refine((data) => data.password === data.confirmpassword, {
  message: "Passwords do not match",
  path: ["confirmpassword"],
});