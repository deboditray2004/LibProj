import { Router } from "express"
import { 
    getPendingStudents, 
    approveStudent, 
    rejectStudent, 
    getPendingEdits, 
    approveProfileEdit, 
    rejectProfileEdit 
} from "../controllers/management.controller.js"
import { verifyEmployee } from "../middlewares/auth.middleware.js"

const router = Router()

// All management routes require Employee verification
router.use(verifyEmployee)

router.route("/pending-students").get(getPendingStudents)
router.route("/approve-student/:studentId").post(approveStudent)
router.route("/reject-student/:studentId").post(rejectStudent)

router.route("/pending-edits").get(getPendingEdits)
router.route("/approve-edit/:studentId").post(approveProfileEdit)
router.route("/reject-edit/:studentId").post(rejectProfileEdit)

export default router
