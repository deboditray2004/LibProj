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

const router = Router()

router.route("/register").post(
    upload.fields([
        { name: "photo", maxCount: 1 },
        { name: "govtId", maxCount: 1 }
    ]),
    registerStudent
)

router.route("/login").post(loginStudent)

// Secured routes
router.route("/logout").post(verifyStudent, logoutStudent)
router.route("/profile").get(verifyStudent, getStudentProfile)
router.route("/update-profile").post(verifyStudent, requestProfileUpdate)

export default router
