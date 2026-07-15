import { z } from "zod"

export const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
    role: z.enum(["student", "employee"], {
        required_error: "Role is required (student or employee)"
    })
})

export const resetPasswordSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})
