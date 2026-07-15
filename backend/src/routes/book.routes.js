import { Router } from "express"
import { 
    requestBook, 
    getAggregatedRequests, 
    rejectBookRequest, 
    placeOrder, 
    manualOrder, 
    receiveOrder, 
    getAllBooks, 
    getBookById,
    getAllOrders,
    getAllCategories
} from "../controllers/book.controller.js"
import { verifyStudent, verifyEmployee } from "../middlewares/auth.middleware.js"
import { validate } from "../middlewares/validate.middleware.js"
import { requestBookSchema, rejectRequestSchema, placeOrderSchema, manualOrderSchema } from "../validators/book.validator.js"

const router = Router()

// Public Routes
router.route("/search").get(getAllBooks)
router.route("/categories").get(getAllCategories)


// Student Routes
router.route("/request").post(verifyStudent, validate(requestBookSchema), requestBook)

// Employee Routes
router.route("/requests/aggregated").get(verifyEmployee, getAggregatedRequests)
router.route("/requests/reject").post(verifyEmployee, validate(rejectRequestSchema), rejectBookRequest)
router.route("/orders").get(verifyEmployee, getAllOrders)
router.route("/orders/place").post(verifyEmployee, validate(placeOrderSchema), placeOrder)
router.route("/orders/manual").post(verifyEmployee, validate(manualOrderSchema), manualOrder)
router.route("/orders/receive/:orderId").post(verifyEmployee, receiveOrder)

router.route("/:bookId").get(getBookById)

export default router
