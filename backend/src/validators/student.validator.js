import { z } from "zod"

export const registerStudentSchema = z.object({
    name: z.string().min(1, "Name is required"),
    dob: z.string().min(1, "Date of birth is required"),
    addr: z.string().min(1, "Address is required"),
    email: z.string().email("Invalid email address"),
    dept: z.string().min(1, "Department is required"),
    rollNo: z.string().min(1, "Roll number is required"),
    password: z.string().min(6, "Password must be at least 6 characters")
})

export const loginStudentSchema = z.object({
    cardNo: z.string().min(1, "Card number is required"),
    password: z.string().min(1, "Password is required")
})

export const updateProfileSchema = z.object({
    name: z.string().optional(),
    dob: z.string().optional(),
    addr: z.string().optional(),
    email: z.string().email("Invalid email address").optional(),
    dept: z.string().optional(),
    rollNo: z.string().optional()
}).refine(data => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update"
})
