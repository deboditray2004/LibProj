import { Router } from "express"
import { 
    submitFeedback, 
    getStudentInbox, 
    getEmployeeInbox, 
    replyToFeedback 
} from "../controllers/communication.controller.js"
import { verifyStudent, verifyEmployee } from "../middlewares/auth.middleware.js"

const router = Router()

// Student Routes
router.route("/feedback").post(verifyStudent, submitFeedback)
router.route("/inbox/student").get(verifyStudent, getStudentInbox)

// Employee Routes
router.route("/inbox/employee").get(verifyEmployee, getEmployeeInbox)
router.route("/feedback/reply").post(verifyEmployee, replyToFeedback)

export default router
