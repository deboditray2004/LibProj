import { Router } from "express"
import { loginEmployee, logoutEmployee } from "../controllers/employee.controller.js"
import { verifyEmployee } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/login").post(loginEmployee)

// Secured routes
router.route("/logout").post(verifyEmployee, logoutEmployee)

export default router
