import { z } from "zod"

export const loginEmployeeSchema = z.object({
    empId: z.string().min(1, "Employee ID is required"),
    password: z.string().min(1, "Password is required")
})
