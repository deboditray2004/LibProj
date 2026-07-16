import { z } from "zod"

export const requestBookSchema = z.object({
    isbn: z.string().min(1, "ISBN is required")
})

export const rejectRequestSchema = z.object({
    isbn: z.string().min(1, "ISBN is required")
})

export const placeOrderSchema = z.object({
    isbn: z.string().min(1, "ISBN is required"),
    copiesOrdered: z.number().int().positive("Copies ordered must be a positive integer")
})

export const manualOrderSchema = z.object({
    isbn: z.string().min(1, "ISBN is required"),
    copiesOrdered: z.number().int().positive("Copies ordered must be a positive integer")
})
