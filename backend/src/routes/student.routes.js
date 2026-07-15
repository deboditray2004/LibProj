import { Router } from "express"
import { 
    registerStudent, 
    loginStudent, 
    logoutStudent, 
    getStudentProfile, 
    requestProfileUpdate 
} from "../controllers/student.controller.js"

import { upload } from "../middlewares/multer.middleware.js"
import { verifyStudent } from "../middlewares/auth.middleware.js"
import { validate } from "../middlewares/validate.middleware.js"
import { registerStudentSchema, loginStudentSchema, updateProfileSchema } from "../validators/student.validator.js"

const router = Router()

router.route("/register").post(
    upload.fields([
        { name: "govtId", maxCount: 1 }
    ]),
    validate(registerStudentSchema),
    registerStudent
)

router.route("/login").post(validate(loginStudentSchema), loginStudent)

// Secured routes
router.route("/logout").post(verifyStudent, logoutStudent)
router.route("/profile").get(verifyStudent, getStudentProfile)
router.route("/update-profile").post(verifyStudent, validate(updateProfileSchema), requestProfileUpdate)

export default router
