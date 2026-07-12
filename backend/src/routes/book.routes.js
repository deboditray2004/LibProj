import { Router } from "express"
import { 
    requestBook, 
    getAggregatedRequests, 
    rejectBookRequest, 
    placeOrder, 
    manualOrder, 
    receiveOrder, 
    getAllBooks, 
    getBookById 
} from "../controllers/book.controller.js"
import { verifyStudent, verifyEmployee } from "../middlewares/auth.middleware.js"

const router = Router()

// Public Routes
router.route("/search").get(getAllBooks)
router.route("/:bookId").get(getBookById)

// Student Routes
router.route("/request").post(verifyStudent, requestBook)

// Employee Routes
router.route("/requests/aggregated").get(verifyEmployee, getAggregatedRequests)
router.route("/requests/reject").post(verifyEmployee, rejectBookRequest)
router.route("/orders/place").post(verifyEmployee, placeOrder)
router.route("/orders/manual").post(verifyEmployee, manualOrder)
router.route("/orders/receive/:orderId").post(verifyEmployee, receiveOrder)

export default router
