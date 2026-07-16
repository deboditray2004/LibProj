import { z } from "zod"

export const borrowBookSchema = z.object({
    cardNo: z.string().min(1, "Card number is required"),
    isbn: z.string().min(1, "ISBN is required")
})

export const returnBookSchema = z.object({
    cardNo: z.string().min(1, "Card number is required"),
    isbn: z.string().min(1, "ISBN is required")
})

export const renewBookSchema = z.object({
    transactionId: z.string().min(1, "Transaction ID is required")
})

export const payFineSchema = z.object({
    transactionId: z.string().optional(),
    payAll: z.boolean({
        invalid_type_error: "payAll must be a boolean"
    }).optional()
})
