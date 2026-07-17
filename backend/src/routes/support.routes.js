import { Router } from "express"
import { sendSupportMessage } from "../controllers/support.controller.js"
import { verifyStudent } from "../middlewares/auth.middleware.js"

const router = Router()

// Only authenticated students can send support messages
router.use(verifyStudent)

router.post("/", sendSupportMessage)

export default router
