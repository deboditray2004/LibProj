import { z } from "zod"

export const submitFeedbackSchema = z.object({
    msg: z.string().min(1, "Message is required")
})

export const replyToFeedbackSchema = z.object({
    feedBackId: z.string().min(1, "Feedback ID is required"),
    replyMsg: z.string().min(1, "Reply message is required")
})
