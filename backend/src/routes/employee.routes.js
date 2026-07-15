import { Router } from "express"
import { loginEmployee, logoutEmployee } from "../controllers/employee.controller.js"
import { verifyEmployee } from "../middlewares/auth.middleware.js"
import { validate } from "../middlewares/validate.middleware.js"
import { loginEmployeeSchema } from "../validators/employee.validator.js"

const router = Router()

router.route("/login").post(validate(loginEmployeeSchema), loginEmployee)

// Secured routes
router.route("/logout").post(verifyEmployee, logoutEmployee)

export default router
