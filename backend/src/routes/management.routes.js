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
import { validate } from "../middlewares/validate.middleware.js"
import { approveStudentSchema, rejectStudentSchema, approveEditSchema, rejectEditSchema } from "../validators/management.validator.js"

const router = Router()

// All management routes require Employee verification
router.use(verifyEmployee)

// Employee (Admin) Routes
router.route("/students/pending").get(getPendingStudents)
router.route("/students/approve").post(validate(approveStudentSchema), approveStudent)
router.route("/students/reject").post(validate(rejectStudentSchema), rejectStudent)

router.route("/edits/pending").get(getPendingEdits)
router.route("/edits/approve").post(validate(approveEditSchema), approveProfileEdit)
router.route("/edits/reject").post(validate(rejectEditSchema), rejectProfileEdit)

export default router
