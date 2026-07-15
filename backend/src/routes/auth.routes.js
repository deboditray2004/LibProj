import { Router } from "express"
import { forgotPassword, resetPassword } from "../controllers/auth.controller.js"
import { validate } from "../middlewares/validate.middleware.js"
import { forgotPasswordSchema, resetPasswordSchema } from "../validators/auth.validator.js"

const router = Router()

// Public Routes (Anyone can request a password reset)
router.route("/forgot-password").post(validate(forgotPasswordSchema), forgotPassword)
router.route("/reset-password/:token").post(validate(resetPasswordSchema), resetPassword)

export default router
