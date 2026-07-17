import { Router } from "express"
import { loginEmployee, logoutEmployee, getEmployeeProfile } from "../controllers/employee.controller.js"
import { verifyEmployee } from "../middlewares/auth.middleware.js"
import { validate } from "../middlewares/validate.middleware.js"
import { loginEmployeeSchema } from "../validators/employee.validator.js"
import rateLimit from "express-rate-limit"

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { success: false, message: "Too many attempts, please try again after 15 minutes" }
})

const router = Router()

router.route("/login").post(authLimiter, validate(loginEmployeeSchema), loginEmployee)


router.route("/logout").post(verifyEmployee, logoutEmployee)
router.route("/profile").get(verifyEmployee, getEmployeeProfile)

export default router
