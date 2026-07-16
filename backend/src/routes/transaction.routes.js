import { Router } from "express"
import { 
    borrowBook, 
    returnBook, 
    renewBook, 
    getTransactionHistory, 
    payFine,
    waiveFine
} from "../controllers/transaction.controller.js"
import { verifyStudent, verifyEmployee } from "../middlewares/auth.middleware.js"
import { validate } from "../middlewares/validate.middleware.js"
import { borrowBookSchema, returnBookSchema, renewBookSchema, payFineSchema } from "../validators/transaction.validator.js"

const router = Router()

// Employee Routes
router.route("/borrow").post(verifyEmployee, validate(borrowBookSchema), borrowBook)
router.route("/return").post(verifyEmployee, validate(returnBookSchema), returnBook)
router.route("/waive-fine").post(verifyEmployee, waiveFine)

// Student Routes
router.route("/renew").post(verifyStudent, validate(renewBookSchema), renewBook)
router.route("/history").get(verifyStudent, getTransactionHistory)
router.route("/pay-fine").post(verifyStudent, validate(payFineSchema), payFine)

export default router
