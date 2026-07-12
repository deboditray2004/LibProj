import { Router } from "express"
import { 
    borrowBook, 
    returnBook, 
    renewBook, 
    getTransactionHistory, 
    payFine 
} from "../controllers/transaction.controller.js"
import { verifyStudent, verifyEmployee } from "../middlewares/auth.middleware.js"

const router = Router()

// Employee Routes
router.route("/borrow").post(verifyEmployee, borrowBook)
router.route("/return").post(verifyEmployee, returnBook)

// Student Routes
router.route("/renew").post(verifyStudent, renewBook)
router.route("/history").get(verifyStudent, getTransactionHistory)
router.route("/pay-fine").post(verifyStudent, payFine)

export default router
