import { z } from "zod"

export const approveStudentSchema = z.object({
    studentId: z.string().min(1, "Student ID is required")
})

export const rejectStudentSchema = z.object({
    studentId: z.string().min(1, "Student ID is required"),
    reason: z.string().min(1, "Rejection reason is required")
})

export const approveEditSchema = z.object({
    studentId: z.string().min(1, "Student ID is required")
})

export const rejectEditSchema = z.object({
    studentId: z.string().min(1, "Student ID is required"),
    reason: z.string().min(1, "Rejection reason is required")
})
