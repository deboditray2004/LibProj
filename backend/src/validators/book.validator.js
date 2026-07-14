import { z } from "zod"

export const requestBookSchema = z.object({
    isbn: z.string().min(1, "ISBN is required")
})

export const rejectRequestSchema = z.object({
    requestIds: z.array(z.string()).min(1, "Please provide an array of request IDs to reject")
})

export const placeOrderSchema = z.object({
    isbn: z.string().min(1, "ISBN is required"),
    copiesOrdered: z.number().int().positive("Copies ordered must be a positive integer"),
    requestIds: z.array(z.string()).min(1, "Please provide an array of request IDs to fulfill")
})

export const manualOrderSchema = z.object({
    isbn: z.string().min(1, "ISBN is required"),
    copiesOrdered: z.number().int().positive("Copies ordered must be a positive integer")
})
