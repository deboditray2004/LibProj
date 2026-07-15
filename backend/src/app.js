import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//import routes
import studentRouter from "./routes/student.routes.js"
import employeeRouter from "./routes/employee.routes.js"
import managementRouter from "./routes/management.routes.js"
import bookRouter from "./routes/book.routes.js"
import transactionRouter from "./routes/transaction.routes.js"
import authRouter from "./routes/auth.routes.js"

//mount routes
app.use("/api/students", studentRouter)
app.use("/api/employees", employeeRouter)
app.use("/api/management", managementRouter)
app.use("/api/books", bookRouter)
app.use("/api/transactions", transactionRouter)
app.use("/api/auth", authRouter)

//global Error Handler
app.use((err, req, res, next) => {
    
    // mongoose OCC VersionError
    if (err instanceof mongoose.Error.VersionError) {
        return res.status(409).json({
            statusCode: 409,
            message: "A concurrency conflict occurred. The record was modified by another request. Please refresh and try again.",
            success: false,
            errors: []
        })
    }

    //default ApiError format or fallback
    const statusCode = err.statusCode || 500
    const message = err.message || "Something went wrong on the server"
    
    return res.status(statusCode).json({
        statusCode,
        message,
        success: false,
        errors: err.errors || []
    })
})

export { app }
