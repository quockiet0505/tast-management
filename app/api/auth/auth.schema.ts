// login, register
import * as z from "zod";

export const RegisterSchema = z.object({
     email: z.string().min(1, "Email is required").email("Invalid email address"),
     password: z.string().min(6, "Password must be at least 6 characters long"),
     confirmPassword: z.string().min(1, "Please confirm your password"),
     organizationName: z.string().min(1, "Organization name is required"),
})

export type RegisterInput = z.infer<typeof RegisterSchema>

export const LoginSchema = z.object({
     email: z.string().min(1, "Email is required").email("Invalid email address"),
     password: z.string().min(6, "Password is required"),
})

export type LoginInput = z.infer<typeof LoginSchema>