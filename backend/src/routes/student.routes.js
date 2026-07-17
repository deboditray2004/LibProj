import { Router } from "express"
import { 
    registerStudent, 
    loginStudent, 
    logoutStudent, 
    getStudentProfile, 
    requestProfileUpdate,
    changePassword
} from "../controllers/student.controller.js"

import { upload } from "../middlewares/multer.middleware.js"
import { verifyStudent } from "../middlewares/auth.middleware.js"
import { validate } from "../middlewares/validate.middleware.js"
import { registerStudentSchema, loginStudentSchema, updateProfileSchema, changePasswordSchema } from "../validators/student.validator.js"
import rateLimit from "express-rate-limit"

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { success: false, message: "Too many attempts, please try again after 15 minutes" }
})

const router = Router()

router.route("/register").post(
    upload.fields([
        { name: "govtId", maxCount: 1 }
    ]),
    validate(registerStudentSchema),
    registerStudent
)

router.route("/login").post(authLimiter, validate(loginStudentSchema), loginStudent)

// Secured routes
router.route("/logout").post(verifyStudent, logoutStudent)
router.route("/profile").get(verifyStudent, getStudentProfile)
router.route("/update-profile").post(verifyStudent, validate(updateProfileSchema), requestProfileUpdate)
router.route("/change-password").post(verifyStudent, validate(changePasswordSchema), changePassword)

export default router
