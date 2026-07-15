import { Router } from "express"
import { 
    getPendingStudents, 
    approveStudent, 
    rejectStudent, 
    getPendingProfileEdits, 
    approveProfileEdit, 
    rejectProfileEdit 
} from "../controllers/management.controller.js"
import { verifyEmployee } from "../middlewares/auth.middleware.js"
import { validate } from "../middlewares/validate.middleware.js"
import { approveStudentSchema, rejectStudentSchema, approveEditSchema, rejectEditSchema } from "../validators/management.validator.js"

const router = Router()

// All management routes require Employee verification
router.use(verifyEmployee)

router.route("/pending-students").get(getPendingStudents)
router.route("/approve-student").post(validate(approveStudentSchema), approveStudent)
router.route("/reject-student").post(validate(rejectStudentSchema), rejectStudent)

router.route("/edits/pending").get(getPendingProfileEdits)
router.route("/approve-edit").post(validate(approveEditSchema), approveProfileEdit)
router.route("/reject-edit").post(validate(rejectEditSchema), rejectProfileEdit)

export default router
