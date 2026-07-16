# Project Context

## Overview
This document contains the entire source code and directory structure for the Library Management System project to provide full context to an LLM.

## Directory Structure
```text
├── .gitignore
├── backend
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── public
│   ├── seed.js
│   ├── seed_employee.js
│   └── src
│       ├── app.js
│       ├── constants.js
│       ├── controllers
│       │   ├── auth.controller.js
│       │   ├── book.controller.js
│       │   ├── employee.controller.js
│       │   ├── management.controller.js
│       │   ├── student.controller.js
│       │   └── transaction.controller.js
│       ├── db
│       │   ├── data
│       │   │   ├── books.json
│       │   │   ├── employees.json
│       │   │   ├── students.json
│       │   │   └── transactions.json
│       │   └── index.js
│       ├── index.js
│       ├── middlewares
│       │   ├── auth.middleware.js
│       │   ├── multer.middleware.js
│       │   └── validate.middleware.js
│       ├── models
│       │   ├── book.model.js
│       │   ├── bookRequest.model.js
│       │   ├── employee.model.js
│       │   ├── notification.model.js
│       │   ├── order.model.js
│       │   ├── student.model.js
│       │   ├── studentRequest.model.js
│       │   └── transaction.model.js
│       ├── routes
│       │   ├── auth.routes.js
│       │   ├── book.routes.js
│       │   ├── employee.routes.js
│       │   ├── management.routes.js
│       │   ├── student.routes.js
│       │   └── transaction.routes.js
│       ├── scripts
│       │   └── adminSetup.js
│       ├── utils
│       │   ├── ApiError.js
│       │   ├── ApiResponse.js
│       │   ├── asyncHandler.js
│       │   ├── cloudinary.js
│       │   ├── googleBooksAPI.js
│       │   ├── mailer.js
│       │   └── sessionWrapper.js
│       └── validators
│           ├── auth.validator.js
│           ├── book.validator.js
│           ├── communication.validator.js
│           ├── employee.validator.js
│           ├── management.validator.js
│           ├── student.validator.js
│           └── transaction.validator.js
├── claude_context.md
├── frontend
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── .oxlintrc.json
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   ├── favicon.svg
│   │   ├── icons.svg
│   │   └── _redirects
│   ├── README.md
│   ├── src
│   │   ├── api
│   │   │   ├── client.ts
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   ├── components
│   │   │   ├── FloatingContactBtn.tsx
│   │   │   ├── layout
│   │   │   │   ├── EmployeeLayout.tsx
│   │   │   │   └── StudentLayout.tsx
│   │   │   └── ui
│   │   ├── context
│   │   │   └── AuthContext.tsx
│   │   ├── features
│   │   │   ├── auth
│   │   │   │   ├── EmployeeLoginPage.tsx
│   │   │   │   ├── ForgotPasswordPage.tsx
│   │   │   │   ├── RegisterPage.tsx
│   │   │   │   ├── ResetPasswordPage.tsx
│   │   │   │   └── StudentLoginPage.tsx
│   │   │   ├── employee
│   │   │   │   ├── BookRequestsPage.tsx
│   │   │   │   ├── EmployeeCataloguePage.tsx
│   │   │   │   ├── EmployeeDashboard.tsx
│   │   │   │   ├── OrdersPage.tsx
│   │   │   │   ├── PendingEditsPage.tsx
│   │   │   │   └── PendingStudentsPage.tsx
│   │   │   ├── public
│   │   │   │   ├── CataloguePage.tsx
│   │   │   │   └── LandingPage.tsx
│   │   │   └── student
│   │   │       ├── StudentCataloguePage.tsx
│   │   │       ├── StudentDashboard.tsx
│   │   │       └── StudentHistoryPage.tsx
│   │   ├── index.css
│   │   ├── main.tsx
│   │   └── types
│   │       └── auth.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── package-lock.json
├── package.json
├── public
└── README.md
```

## File Contents

### .gitignore
```
node_modules/
.env
.DS_Store
dist/
coverage/
all_notes.js

```

### backend\.env
```
PORT=8000
MONGODB_URI=mongodb://deboditray08:6Lingering@ac-ykihodz-shard-00-00.zsrmhn9.mongodb.net:27017,ac-ykihodz-shard-00-01.zsrmhn9.mongodb.net:27017,ac-ykihodz-shard-00-02.zsrmhn9.mongodb.net:27017/?ssl=true&replicaSet=atlas-st168i-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Library
CORS_ORIGIN=http://localhost:5173

ACCESS_TOKEN_SECRET=ea464a605477f7b896dcb40c6c6446307ffc7440367fd427a69480668091ed7579281d2fde4f33b8ce276d04411cd1d82060dbc86d9803f58a9382e645949c70
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=a579bc03a3f477838bdae4fb1d4dc62d0d8039a7ed42957360f2a0ea634b997f94174b2735a5d36a6b09fd8462f4d7dcfdafe3230a264b93bae1656ae08e031d
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=dqse84plz
CLOUDINARY_API_KEY=	753448288359437
CLOUDINARY_API_SECRET=xU6wG9vnC-XAnfg174dLUB66vms

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=libraryproj.mgmt@gmail.com
SMTP_PASS=jiymgsnfqfruzihs

GOOGLE_BOOKS_API_KEY=AIzaSyC592ldsfqexD-gjiE8R9KHq5K4I4Ycbos

```

### backend\.env.example
```example
PORT=8000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/library
CORS_ORIGIN=http://localhost:5173

ACCESS_TOKEN_SECRET=your_super_secret_access_token_key_here
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_super_secret_refresh_token_key_here
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_smtp_email@example.com
SMTP_PASS=your_smtp_app_password

GOOGLE_BOOKS_API_KEY=your_google_books_api_key

```

### backend\.gitignore
```
node_modules/
.env
.env.*
!.env.example
npm-debug.log
yarn-error.log
*.log
public/temp/*
!public/temp/.gitkeep

```

### backend\seed.js
```javascript
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { Book } from './src/models/book.model.js';
import { Student } from './src/models/student.model.js';
import { Employee } from './src/models/employee.model.js';
import { Transaction } from './src/models/transaction.model.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function loadJSON(filename) {
  const filePath = path.join(__dirname, 'src', 'db', 'data', filename);
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

export async function seed() {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('Connected to MongoDB for seeding...');
    }

    // 1. Seed Employees (Append Only)
    const employeesData = await loadJSON('employees.json');
    for (const empData of employeesData) {
      const exists = await Employee.findOne({ empId: empData.empId });
      if (!exists) {
        const hashedPassword = await bcrypt.hash(empData.password, 10);
        await Employee.create({ ...empData, password: hashedPassword });
        console.log(`Appended Employee: ${empData.empId}`);
      }
    }

    // 2. Seed Students (Append Only)
    const studentsData = await loadJSON('students.json');
    for (const stuData of studentsData) {
      const exists = await Student.findOne({ rollNo: stuData.rollNo });
      if (!exists) {
        const hashedPassword = await bcrypt.hash(stuData.password, 10);
        await Student.create({ ...stuData, password: hashedPassword });
        console.log(`Appended Student: ${stuData.rollNo}`);
      }
    }

    // 3. Seed Books (Append Only)
    const booksData = await loadJSON('books.json');
    for (const bookData of booksData) {
      const exists = await Book.findOne({ globalBookId: bookData.globalBookId });
      if (!exists) {
        await Book.create(bookData);
        console.log(`Appended Book: ${bookData.globalBookId}`);
      }
    }

    // 4. Seed Transactions (Append Only, Mapping refs)
    const txnsData = await loadJSON('transactions.json');
    for (const txnData of txnsData) {
      const student = await Student.findOne({ rollNo: txnData.studentRollNo });
      const book = await Book.findOne({ globalBookId: txnData.globalBookId });

      if (student && book) {
        // Prevent duplicate seed transactions by checking if one exists for this student+book
        const exists = await Transaction.findOne({ s_id: student._id, b_id: book._id });
        if (!exists) {
          const now = Date.now();
          const newTxn = new Transaction({
            s_id: student._id,
            b_id: book._id,
            brwDate: new Date(now + txnData.borrowDateOffsetDays * 86400000),
            dueDate: new Date(now + txnData.dueDateOffsetDays * 86400000),
            status: txnData.status,
            renewalCnt: txnData.renewalCnt
          });

          if (txnData.rtrnDateOffsetDays) {
            newTxn.rtrnDate = new Date(now + txnData.rtrnDateOffsetDays * 86400000);
            newTxn.frozenFine = txnData.fine || 0;
          }

          await newTxn.save();
          // Decrease availability
          book.avl = Math.max(0, book.avl - 1);
          await book.save();
          console.log(`Appended Transaction for Student: ${txnData.studentRollNo}`);
        }
      }
    }

    console.log('Seed process completed successfully (Append-Only mode).');
  } catch (error) {
    console.error('Seed error:', error);
  }
}

// Execute if run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seed().then(() => process.exit(0)).catch(() => process.exit(1));
}

```

### backend\seed_employee.js
```javascript
import 'dotenv/config';
import connectDB from './src/db/index.js';
import { Employee } from './src/models/employee.model.js';

const seed = async () => {
  try {
    await connectDB();
    const existing = await Employee.findOne({ empId: 'EMP001' });
    if (!existing) {
      await Employee.create({ name: 'Admin', email: 'admin@lib.com', empId: 'EMP001', password: 'password123' });
      console.log('Employee EMP001 created');
    } else {
      console.log('Employee EMP001 exists');
    }
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
};

seed();

```

### backend\src\app.js
```javascript
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"

const app = express()

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || origin.startsWith("http://localhost:") || origin === process.env.CORS_ORIGIN) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
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

```

### backend\src\constants.js
```javascript
export const BORROW_PERIOD_MS = 14 * 24 * 60 * 60 * 1000
export const RENEWAL_PERIOD_MS = 7 * 24 * 60 * 60 * 1000
export const FINE_PER_DAY = 5

```

### backend\src\controllers\auth.controller.js
```javascript
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Student } from "../models/student.model.js"
import { Employee } from "../models/employee.model.js"
import { sendMail } from "../utils/mailer.js"
import crypto from "crypto"

export const forgotPassword = asyncHandler(async (req, res) => {
    const { email, role } = req.body

    const Model = role === "student" ? Student : Employee
    const user = await Model.findOne({ email })

    if (!user) {
        // We throw a generic error to prevent email enumeration, 
        // but for usability we can just say "User not found"
        throw new ApiError(404, "User with this email does not exist")
    }

    const resetToken = user.createPasswordResetToken()
    
    // Save the user with the new token fields, but disable validation because 
    // some fields might be required during normal creation but not updates
    await user.save({ validateBeforeSave: false })

    // In a real app, this would point to the frontend React URL
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`

    const message = `
        <h2>Password Reset Request</h2>
        <p>You requested a password reset for your Library ${role} account.</p>
        <p>Please click the link below to reset your password. This link is valid for 15 minutes.</p>
        <a href="${resetUrl}" style="padding:10px 20px; background-color:#4f46e5; color:white; text-decoration:none; border-radius:5px;">Reset Password</a>
        <p>If you did not request this, please ignore this email.</p>
    `

    try {
        await sendMail(
            user.email,
            "Password Reset - Library Management System",
            message
        )

        return res.status(200).json(
            new ApiResponse(200, {}, "Token sent to email successfully")
        )
    } catch (error) {
        user.forgotPasswordToken = undefined
        user.forgotPasswordExpiry = undefined
        await user.save({ validateBeforeSave: false })

        throw new ApiError(500, "There was an error sending the email. Try again later.")
    }
})

export const resetPassword = asyncHandler(async (req, res) => {
    const { token } = req.params
    const { password } = req.body

    // Hash the token from the URL to compare with the DB hash
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex")

    // Find a student or employee with this token and a valid expiry
    let user = await Student.findOne({
        forgotPasswordToken: hashedToken,
        forgotPasswordExpiry: { $gt: Date.now() }
    })

    if (!user) {
        user = await Employee.findOne({
            forgotPasswordToken: hashedToken,
            forgotPasswordExpiry: { $gt: Date.now() }
        })
    }

    if (!user) {
        throw new ApiError(400, "Token is invalid or has expired")
    }

    // Update password (pre-save hook will bcrypt it)
    user.password = password
    
    // Clear the reset token fields
    user.forgotPasswordToken = undefined
    user.forgotPasswordExpiry = undefined
    
    await user.save()

    return res.status(200).json(
        new ApiResponse(200, {}, "Password reset successful! You can now log in.")
    )
})

```

### backend\src\controllers\book.controller.js
```javascript
import { asyncHandler } from "../utils/asyncHandler.js"
import { sessionWrapper } from "../utils/sessionWrapper.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js"
import { Book } from "../models/book.model.js"
import { Transaction } from "../models/transaction.model.js"
import { BookRequest } from "../models/bookRequest.model.js"
import { Order } from "../models/order.model.js"
import { searchGlobalBook } from "../utils/googleBooksAPI.js"
import { sendMail } from "../utils/mailer.js"

const requestBook = asyncHandler(async (req, res) => {

    const { isbn } = req.body

    const bookRequest = new BookRequest({
        s_id: req.student._id,
        isbn
    })
    await bookRequest.save()
    return res.status(201).json(new ApiResponse(201, bookRequest, "Book request placed successfully"))
})

const getAggregatedRequests = asyncHandler(async (req, res) => {

    const aggregatedRequests = await BookRequest.aggregate([
        {
            $group: {
                _id: "$isbn",
                requestCount: { $sum: 1 },
                requestIds: { $push: "$_id" }
            }
        },
        {
            $sort: {
                requestCount: -1
            }
        }
    ])

    return res.status(200).json(
        new ApiResponse(200, aggregatedRequests, "Aggregated requests fetched successfully")
    )
})

const rejectBookRequest = asyncHandler(async (req, res) => {
    
    const { requestIds } = req.body

    await BookRequest.deleteMany({ _id: { $in: requestIds } })
    return res.status(200).json(
        new ApiResponse(200, null, "Book requests rejected successfully")
    )
})

const placeOrder = asyncHandler(async (req, res) => {

    const { isbn, copiesOrdered, requestIds } = req.body
    const match = await searchGlobalBook(isbn)
    if (!match)
    throw new ApiError(404, "Book not found in global catalogue")

    const orderResult = await sessionWrapper(async (session) => {
        const requests = await BookRequest.find({ _id: { $in: requestIds } }).session(session)
        const requesters = requests.map(req => req.s_id)

        const order = new Order({
            globalBookId: match.globalBookId,
            orderTitle: match.orderTitle,
            authors: match.authors,
            coverImg: match.coverImg,
            category: match.category,
            copiesOrdered,
            requesters
        })
        await order.save({ session })
        
        await BookRequest.deleteMany({ _id: { $in: requestIds } }).session(session)
        
        return order
    })
    
    return res.status(201).json(new ApiResponse(201, orderResult, "Order placed successfully"))
})

const manualOrder = asyncHandler(async (req, res) => {
    
    const { isbn, copiesOrdered} = req.body
    const match = await searchGlobalBook(isbn)
    if (!match)
    throw new ApiError(404, "Book not found in global catalogue")


    const orderResult = await sessionWrapper(async (session) => {
        const requests = await BookRequest.find({ isbn }).session(session)
        const requesters = requests.map(req => req.s_id)

        const order = new Order({
            globalBookId: match.globalBookId,
            orderTitle: match.orderTitle,
            authors: match.authors,
            coverImg: match.coverImg,
            category: match.category,
            copiesOrdered,
            requesters
        })
        await order.save({ session })
        
        await BookRequest.deleteMany({ isbn }).session(session)
        
        return order
    })
    
    return res.status(201).json(new ApiResponse(201, orderResult, "Order placed successfully"))
})

const receiveOrder = asyncHandler(async (req, res) => {

    const {orderId} = req.params
    if(!orderId)
    throw new ApiError(400, "Missing order ID")
    const order = await Order.findById(orderId).populate("requesters", "email name")
    if(!order)
    throw new ApiError(404, "Order not found")
    const existingBook = await Book.findOne({ globalBookId: order.globalBookId })
    
    await sessionWrapper(async (session) => {

        if (existingBook) {
            existingBook.total += order.copiesOrdered
            existingBook.avl += order.copiesOrdered
            await existingBook.save({ session })
        } 
        else {
            const newBook = new Book({
                globalBookId: order.globalBookId,
                title: order.orderTitle,
                authors: order.authors,
                category: order.category,
                coverImg: order.coverImg,
                total: order.copiesOrdered,
                avl: order.copiesOrdered
            })
            await newBook.save({ session })
        }

        order.status = "Received"
        await order.save({ session })
    })

    if (order.requesters && order.requesters.length > 0) {
        order.requesters.forEach(student => {
            sendMail(
                student.email,
                "Book Now Available",
                `<p>Hello ${student.name},</p><p>The book <strong>${order.orderTitle}</strong> that you requested is now available at the library!</p><p>Please visit the library to borrow it.</p>`
            ).catch(err => console.error("Failed to send Book Available email", err))
        })
    }
    
    return res.status(200).json(
        new ApiResponse(200, order, "Order received successfully")
    )
})

const getAllBooks = asyncHandler(async (req, res) => {
    const { search, category } = req.query
    const query = {}
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: "i" } },
            { authors: { $regex: search, $options: "i" } }
        ]
    }
    
    if (category)
    query.category = { $regex: category, $options: "i" }
    let books = await Book.find(query).lean()
    if (!books || books.length === 0) {
        throw new ApiError(404, "No books found matching your criteria")
    }
    
    books = await Promise.all(books.map(async (book) => {
        if (book.avl === 0) {
            const activeTransactions = await Transaction.find({ 
                b_id: book._id, 
                rtrnDate: { $exists: false } 
            }).sort({ dueDate: 1 }).limit(1)
            
            if (activeTransactions.length > 0) {
                book.expectedReturnDate = activeTransactions[0].dueDate
            }
        }
        return book
    }))
    
    return res.status(200).json(
        new ApiResponse(200, books, "Books fetched successfully")
    )
})

const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Book.distinct("category")
    return res.status(200).json(
        new ApiResponse(200, categories, "Categories fetched successfully")
    )
})

const getBookById = asyncHandler(async (req, res) => {
    
    const {bookId} = req.params
    if(!bookId)
    throw new ApiError(400, "Missing book ID")
    const book = await Book.findById(bookId)
    if(!book)
    throw new ApiError(404, "Book not found")
    return res.status(200).json(
        new ApiResponse(200, book, "Book fetched successfully")
    )
})

const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).sort({ createdAt: -1 })
    return res.status(200).json(
        new ApiResponse(200, orders, "Orders fetched successfully")
    )
})

export {
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
}
```

### backend\src\controllers\employee.controller.js
```javascript
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Employee } from "../models/employee.model.js"

const generateAccessAndRefereshTokens = async(employeeId)=>{

    try{
        const employee =await Employee.findById(employeeId)

        const accessToken = await employee.generateAccessToken()
        const refreshToken = await employee.generateRefreshToken()

        employee.refreshToken = refreshToken
        await employee.save({validateBeforeSave:false})

        return {accessToken, refreshToken}
    }
    catch(error){
        throw new ApiError(500,"Error while generating refresh and access tokens", error)
    }
}


const loginEmployee= asyncHandler(async(req, res) =>{

    const {empId , password} = req.body

    const employee=await Employee.findOne({empId})
    if(!employee)
    throw new ApiError(404, "Employee not found")
    
    const isPasswordCorrect = await employee.isPasswordCorrect(password)
    if(!isPasswordCorrect)
    throw new ApiError(401, "Invalid password")

    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(employee._id)

    const loggedInEmployee = await Employee.findById(employee._id).select("-password -refreshToken")
    
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                employee : loggedInEmployee, accessToken, refreshToken
            },
            "Employee logged In Successfully"
        )
    )
    

})

const logoutEmployee = asyncHandler(async(req,res) =>{
    await Employee.findByIdAndUpdate(
        req.employee._id,
        {
            $unset:{
                refreshToken:1
            }
        },
        {
            new : true
        }
    )

    const options ={
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(
            200,
            {},
            "Employee logged out Successfully"
        )
    )
})

export {
    loginEmployee,
    logoutEmployee
}

```

### backend\src\controllers\management.controller.js
```javascript
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Student } from "../models/student.model.js"
import { sendMail } from "../utils/mailer.js"

const getPendingStudents = asyncHandler(async (req, res) => {
    const students = await Student.find({ status: "Pending" }).select("-password -refreshToken")
    
    return res.status(200).json(
        new ApiResponse(200, students, "Pending students fetched successfully")
    )
})

const approveStudent = asyncHandler(async (req, res) => {

    const { studentId } = req.body

    const student = await Student.findById(studentId)
    if (!student) throw new ApiError(404, "Student not found")
    if (student.status === "Approved") throw new ApiError(400, "Student is already approved")

    let cardNo
    let isUnique = false
    while (!isUnique) {
        cardNo = Math.floor( 1000 + Math.random() * 9000)
        const exists = await Student.findOne({ cardNo })
        if (!exists) isUnique = true
    }

    student.cardNo = cardNo
    student.status = "Approved"
    await student.save({ validateBeforeSave: false }) // skip password validation

    const emailHtml = `
        <h2>Welcome to the Library, ${student.name}!</h2>
        <p>Your registration has been officially approved.</p>
        <p>Your Library Card Number is: <strong>${cardNo}</strong></p>
        <p>You can now use this card number to log into your dashboard and borrow books.</p>
    `
    await sendMail(student.email, "Library Registration Approved", emailHtml)

    return res.status(200).json(
        new ApiResponse(200, { cardNo }, "Student approved successfully")
    )
})

const rejectStudent = asyncHandler(async (req, res) => {

    const { studentId, reason } = req.body


    const student = await Student.findById(studentId)
    if (!student) throw new ApiError(404, "Student not found")

    const emailHtml = `
        <h2>Library Registration Update</h2>
        <p>Dear ${student.name},</p>
        <p>Unfortunately, your library registration request has been declined for the following reason:</p>
        <blockquote style="border-left: 4px solid #ff4444; padding-left: 10px;">
            ${reason}
        </blockquote>
        <p>Please contact the library administration if you have any questions.</p>
    `
    await sendMail(student.email, "Library Registration Declined", emailHtml)

    await Student.findByIdAndDelete(studentId)

    return res.status(200).json(
        new ApiResponse(200, null, "Student registration rejected and deleted successfully")
    )
})

const getPendingProfileEdits = asyncHandler(async (req, res) => {

    const students = await Student.find({ pendingEdits: { $ne: null } }).select("-password -refreshToken")
    
    return res.status(200).json(
        new ApiResponse(200, students, "Pending profile edits fetched successfully")
    )
})

const approveProfileEdit = asyncHandler(async (req, res) => {

    const { studentId } = req.body

    const student = await Student.findById(studentId)
    if (!student) throw new ApiError(404, "Student not found")
    if (!student.pendingEdits) throw new ApiError(400, "No pending edits found for this student")

    //merge edits
    const edits = student.pendingEdits
    Object.keys(edits).forEach(key => {
        student[key] = edits[key]
    })
    
    student.pendingEdits = null
    await student.save({ validateBeforeSave: false })

    const emailHtml = `
        <h2>Profile Update Approved</h2>
        <p>Dear ${student.name},</p>
        <p>Your requested profile updates have been reviewed and approved by management. The changes are now live on your account.</p>
    `
    await sendMail(student.email, "Profile Update Approved", emailHtml)

    return res.status(200).json(
        new ApiResponse(200, student, "Profile edits approved successfully")
    )
})

const rejectProfileEdit = asyncHandler(async (req, res) => {
    const { studentId, reason } = req.body

    const student = await Student.findById(studentId)
    if (!student) throw new ApiError(404, "Student not found")
    if (!student.pendingEdits) throw new ApiError(400, "No pending edits found for this student")

    student.pendingEdits = null
    await student.save({ validateBeforeSave: false })

    const emailHtml = `
        <h2>Profile Update Declined</h2>
        <p>Dear ${student.name},</p>
        <p>Your requested profile updates have been declined by management for the following reason:</p>
        <blockquote style="border-left: 4px solid #ff4444; padding-left: 10px;">
            ${reason}
        </blockquote>
    `
    await sendMail(student.email, "Profile Update Declined", emailHtml)

    return res.status(200).json(
        new ApiResponse(200, null, "Profile edits rejected successfully")
    )
})

export {
    getPendingStudents,
    approveStudent,
    rejectStudent,
    getPendingProfileEdits,
    approveProfileEdit,
    rejectProfileEdit
}

```

### backend\src\controllers\student.controller.js
```javascript
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js"
import { Student } from "../models/student.model.js"

const generateAccessAndRefereshTokens = async(studentId)=>{

    try{
        const student =await Student.findById(studentId)

        const accessToken = await student.generateAccessToken()
        const refreshToken = await student.generateRefreshToken()

        student.refreshToken = refreshToken
        await student.save({validateBeforeSave:false})

        return {accessToken, refreshToken}
    }
    catch(error){
        throw new ApiError(500,"Error while generating refresh and access tokens", error)
    }
}

const registerStudent = asyncHandler( async (req, res) => {
    
    const {name, dob, addr, email, dept, rollNo, password } = req.body


    const existingStudent = await Student.findOne({ rollNo })
    if(existingStudent)
    throw new ApiError(409, "Student already registered")
    



    const govtIdLocalPath = req.files?.govtId?.[0]?.path
    let g_id
    if (govtIdLocalPath){
        g_id = await uploadOnCloudinary(govtIdLocalPath)
        if (!g_id?.url)
        throw new ApiError(400, "cloudinary failed to generate g_i")
    }
    else
    throw new ApiError(400, "Government Id is required")


    const student = new Student({
        name,
        govtId: g_id.url,
        dept,
        rollNo,
        dob,
        addr,
        email, 
        password,
    })
    await student.save()


    const createdStudent = await Student.findById(student._id).select(
        "-password -refreshToken"
    )
    if (!createdStudent)
    throw new ApiError(500, "Something went wrong while registering the user")



    return res.status(201)
    .json(
        new ApiResponse(200, createdStudent, "Student registered Successfully")
    )

})

const loginStudent= asyncHandler(async(req, res) =>{

    const {cardNo , password} = req.body

    const student=await Student.findOne({cardNo})
    if(!student)
    throw new ApiError(404, "Student not found")
    if (student.status === "Pending")
    throw new ApiError(403, "Your account is pending Admin approval")

    const isPasswordCorrect = await student.isPasswordCorrect(password)
    if(!isPasswordCorrect)
    throw new ApiError(401, "Invalid password")

    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(student._id)

    const loggedInStudent = await Student.findById(student._id).select("-password -refreshToken")
    
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                student : loggedInStudent, accessToken, refreshToken
            },
            "Student logged In Successfully"
        )
    )
    

})

const logoutStudent = asyncHandler(async(req,res) =>{
    await Student.findByIdAndUpdate(
        req.student._id,
        {
            $unset:{
                refreshToken:1
            }
        },
        {
            new : true
        }
    )

    const options ={
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(
            200,
            {},
            "Student logged out Successfully"
        )
    )
})

const getStudentProfile = asyncHandler(async (req, res) => {
    
    const student = await Student.findById(req.student._id).select("-password -refreshToken")
    if (!student) {
        throw new ApiError(404, "Student not found")
    }

    return res.status(200).json(
        new ApiResponse(200, student, "Student profile loaded successfully")
    )
})

const requestProfileUpdate = asyncHandler(async (req, res) => {
    const updates = req.body

    delete updates.cardNo
    delete updates.status
    delete updates.tot_fine

    const student = await Student.findById(req.student._id)
    if (!student) throw new ApiError(404, "Student not found")
    
    student.pendingEdits = {
        ...(student.pendingEdits || {}),
        ...updates
    }
    await student.save({ validateBeforeSave: false })

    return res.status(200).json(
        new ApiResponse(200, student.pendingEdits, "Profile update requested successfully. Pending admin approval.")
    )
})

export {
    registerStudent,
    loginStudent,
    logoutStudent,
    getStudentProfile,
    requestProfileUpdate
}



```

### backend\src\controllers\transaction.controller.js
```javascript
import { asyncHandler } from "../utils/asyncHandler.js"
import { BORROW_PERIOD_MS, RENEWAL_PERIOD_MS, FINE_PER_DAY } from "../constants.js"
import { sessionWrapper } from "../utils/sessionWrapper.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Transaction } from "../models/transaction.model.js"
import { Book } from "../models/book.model.js"
import { Student } from "../models/student.model.js"

const borrowBook = asyncHandler(async (req, res) => {
    
    const {cardNo, isbn} = req.body
    const student = await Student.findOne({ cardNo })
    if (!student) throw new ApiError(404, "Student not found with this Card Number")

    const book = await Book.findOne({ isbn })
    if (!book || book.avl <= 0) throw new ApiError(404, "Book not available or not found")

    const activeTxn = await Transaction.findOne({
        s_id: student._id,
        b_id: book._id,
        rtrnDate: { $exists: false }
    })
    if (activeTxn)
    throw new ApiError(400, "Student already has an active copy of this book.")

    const transactionResult = await sessionWrapper(async (session) => {
        book.avl -= 1
        await book.save({ session })
        
        const transaction = new Transaction({
            s_id: student._id,
            b_id: book._id,
            dueDate: new Date(Date.now() + BORROW_PERIOD_MS)
        })
        await transaction.save({ session })
        
        return transaction
    })
    
    return res.status(201).json(new ApiResponse(201, transactionResult, "Book borrowed successfully"))
})

const returnBook = asyncHandler(async (req, res) => {
    
    const {cardNo, isbn} = req.body
    const student = await Student.findOne({ cardNo })
    if (!student) throw new ApiError(404, "Student not found with this Card Number")

    const book = await Book.findOne({ isbn })
    if (!book) throw new ApiError(404, "Book not found with this ISBN")

    const transaction = await Transaction.findOne({
        s_id: student._id,
        b_id: book._id,
        rtrnDate: { $exists: false }
    })
    if(!transaction)
    throw new ApiError(404,"Active transaction not found for this student and book")

    transaction.rtrnDate = Date.now()
    const daysLate = Math.max(0, Math.floor((transaction.rtrnDate - transaction.dueDate) / (1000 * 60 * 60 * 24)))
    const activeFine = daysLate * FINE_PER_DAY
    transaction.frozenFine += activeFine
    
    await sessionWrapper(async (session) => {
        book.avl += 1
        await book.save({ session })
        await transaction.save({ session })
    })
    
    return res.status(200).json(new ApiResponse(200, transaction, "Book returned successfully"))
})

const renewBook = asyncHandler(async (req, res) => {
    
    const {transactionId} = req.body
    const transaction = await Transaction.findById(transactionId)
    if(!transaction)
    throw new ApiError(404,"Transaction not found")
    if(transaction.renewalCnt>=2)
    throw new ApiError(400,"Max renewals reached")
    if(transaction.rtrnDate)
    throw new ApiError(400,"Cannot renew a returned book")
    
    const now = Date.now()
    const daysLate = Math.max(0, Math.floor((now - transaction.dueDate) / (1000 * 60 * 60 * 24)))
    const activeFine = daysLate * FINE_PER_DAY
    transaction.frozenFine += activeFine
    transaction.renewalCnt += 1
    transaction.dueDate = new Date(now + RENEWAL_PERIOD_MS)
    await transaction.save()
    return res.status(200).json(new ApiResponse(200, transaction, "Book renewed successfully"))
})

const getTransactionHistory = asyncHandler(async (req, res) => {
    
    const transactions = await Transaction.find({s_id:req.student._id})
    .populate("b_id", "title coverImg") 
    .sort({brwDate:-1})
    const now = Date.now()
    const updatedTransactions = transactions.map(txn => {
        
        const obj = txn.toObject()
        let activeFine = 0
        if (!obj.rtrnDate) {
            const daysLate = Math.max(0, Math.floor((now - obj.dueDate) / (1000 * 60 * 60 * 24)))
            activeFine = daysLate * FINE_PER_DAY
        }
        
        obj.activeFine = activeFine
        obj.totalFine = obj.frozenFine + activeFine
        return obj
    })
    return res.status(200).json(new ApiResponse(200, updatedTransactions, "Transactions fetched successfully"))
})

const payFine = asyncHandler(async (req, res) => {
    const { transactionId, payAll } = req.body
    //pay all fines
    if (payAll) {
        const transactions = await Transaction.find({
            s_id: req.student._id,
            frozenFine: { $gt: 0 }
        })
        if (transactions.length === 0) {
            throw new ApiError(400, "No frozen fines pending to be paid.")
        }

        let totalPaid = 0
        await sessionWrapper(async (session) => {
            for (const txn of transactions) {
                const now = Date.now()
                if (!txn.rtrnDate && now > txn.dueDate)
                continue
                totalPaid += txn.frozenFine
                txn.amountCollected += txn.frozenFine
                txn.frozenFine = 0
                await txn.save({ session })
            }

            if (totalPaid === 0) {
                throw new ApiError(400, "Could not pay fines. All books with fines are actively overdue. Please return/renew them first.")
            }
        })
        
        return res.status(200).json(
            new ApiResponse(200, null, `Successfully paid ₹${totalPaid} for all eligible transactions.`)
        )
    }

    // pay single transaction

    const transaction = await Transaction.findById(transactionId)
    if (!transaction)
    throw new ApiError(404, "Transaction not found")

    const now = Date.now()
    
    if (!transaction.rtrnDate && now > transaction.dueDate)
    throw new ApiError(400, "Cannot pay fine on an actively overdue book. Please return or renew the book first.")
    
    const totalOwed = transaction.frozenFine
    if (totalOwed === 0)
    throw new ApiError(400, "No fine pending for this transaction.")
    transaction.amountCollected += totalOwed
    transaction.frozenFine = 0
    await transaction.save()
    return res.status(200).json(
        new ApiResponse(200, transaction, `Successfully paid ₹${totalOwed} for this transaction.`)
    )
})

const waiveFine = asyncHandler(async (req, res) => {
    const { transactionId } = req.body
    if (!transactionId) throw new ApiError(400, "Transaction ID is required")

    const transaction = await Transaction.findById(transactionId)
    if (!transaction) throw new ApiError(404, "Transaction not found")

    const waivedAmount = transaction.frozenFine
    transaction.frozenFine = 0
    await transaction.save()
    
    return res.status(200).json(
        new ApiResponse(200, transaction, `Successfully waived ₹${waivedAmount} for this transaction.`)
    )
})

export {
    borrowBook,
    returnBook,
    renewBook,
    getTransactionHistory,
    payFine,
    waiveFine
}
```

### backend\src\db\data\books.json
```json
[
  {
    "globalBookId": "OL27329598M",
    "title": "Clean Code: A Handbook of Agile Software Craftsmanship",
    "authors": ["Robert C. Martin"],
    "category": ["Programming", "Software Engineering"],
    "coverImg": "/assets/images/books/clean-code.jpg",
    "total": 5,
    "avl": 5
  },
  {
    "globalBookId": "OL27329599M",
    "title": "Design Patterns: Elements of Reusable Object-Oriented Software",
    "authors": ["Erich Gamma", "Richard Helm", "Ralph Johnson", "John Vlissides"],
    "category": ["Programming", "Design"],
    "coverImg": "/assets/images/books/design-patterns.jpg",
    "total": 3,
    "avl": 3
  },
  {
    "globalBookId": "OL27329600M",
    "title": "The Pragmatic Programmer",
    "authors": ["Andrew Hunt", "David Thomas"],
    "category": ["Programming", "Career"],
    "coverImg": "/assets/images/books/pragmatic-programmer.jpg",
    "total": 4,
    "avl": 4
  }
]

```

### backend\src\db\data\employees.json
```json
[
  {
    "empId": 1001,
    "name": "Admin User",
    "email": "admin@library.com",
    "password": "password123"
  }
]

```

### backend\src\db\data\students.json
```json
[
  {
    "cardNo": 4821,
    "name": "Alice Johnson",
    "dob": "2000-01-01T00:00:00.000Z",
    "addr": "123 College St",
    "email": "alice@example.com",
    "password": "password123",
    "dept": "Computer Science",
    "rollNo": 101,
    "photo": "/assets/images/avatars/student1.jpg",
    "govtId": "/assets/images/branding/placeholder-id.jpg",
    "status": "Approved"
  },
  {
    "cardNo": 4822,
    "name": "Bob Smith",
    "dob": "1999-05-15T00:00:00.000Z",
    "addr": "456 History Blvd",
    "email": "bob@example.com",
    "password": "password123",
    "dept": "History",
    "rollNo": 102,
    "photo": "/assets/images/avatars/student2.jpg",
    "govtId": "/assets/images/branding/placeholder-id.jpg",
    "status": "Approved"
  }
]

```

### backend\src\db\data\transactions.json
```json
[
  {
    "studentRollNo": 101,
    "globalBookId": "OL27329598M",
    "borrowDateOffsetDays": 0,
    "dueDateOffsetDays": 15,
    "status": "Borrowed",
    "renewalCnt": 0
  },
  {
    "studentRollNo": 101,
    "globalBookId": "OL27329599M",
    "borrowDateOffsetDays": -20,
    "dueDateOffsetDays": -5,
    "status": "Borrowed",
    "renewalCnt": 0
  },
  {
    "studentRollNo": 102,
    "globalBookId": "OL27329600M",
    "borrowDateOffsetDays": -30,
    "dueDateOffsetDays": -15,
    "rtrnDateOffsetDays": -10,
    "fine": 50,
    "status": "Returned"
  }
]

```

### backend\src\db\index.js
```javascript
import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MONGODB connection FAILED ", error)
        process.exit(1)
    }
}

export default connectDB

```

### backend\src\index.js
```javascript
import dotenv from "dotenv"
import connectDB from "./db/index.js"
import { app } from "./app.js"


dotenv.config({
    path: './backend/.env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(` Server is running at port : ${process.env.PORT || 8000}`)
    })

})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err)
})

// touch for nodemon

```

### backend\src\middlewares\auth.middleware.js
```javascript
import {ApiError} from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"
import {Student} from "../models/student.model.js"
import {Employee} from "../models/employee.model.js"

const verifyStudent =  asyncHandler( async ( req,_,next) =>
{
    try{
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")

        if(!token)
        throw new ApiError(401,"Unauthorized request")

        const decodedToken =jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

        const student = await Student.findById(decodedToken?._id).select("-password -refreshToken")

        if(!student)
        throw new ApiError(401,"Invalid Access Token")

        req.student=student
        next()
    }
    catch(error)
    {
        throw new ApiError(401,"Invalid access token", error)
    }
        
})

const verifyEmployee =  asyncHandler( async ( req,_,next) =>
{
    try{
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")

        if(!token)
        throw new ApiError(401,"Unauthorized request")

        const decodedToken =jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

        const employee = await Employee.findById(decodedToken?._id).select("-password -refreshToken")

        if(!employee)
        throw new ApiError(401,"Invalid Access Token")

        req.employee=employee
        next()
    }
    catch(error)
    {
        throw new ApiError(401,"Invalid access token", error)
    }
        
})

export {verifyStudent, verifyEmployee}
```

### backend\src\middlewares\multer.middleware.js
```javascript
import multer from "multer"
const storage = multer.diskStorage({
    
    destination: 
        function(req,file,cb)
        {
            cb(null,"./public/temp")
        }
    ,
    filename:
        function(req,file,cb)
        {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()* 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix)
        }
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"]
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error("Only .jpeg, .png, and .webp format allowed!"), false)
    }
}

export const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
})
```

### backend\src\middlewares\validate.middleware.js
```javascript
import { ApiError } from "../utils/ApiError.js"

export const validate = (schema) => async (req, res, next) => {
    try {
        const parseResult = await schema.parseAsync(req.body)
        req.body = parseResult
        next()
    } catch (error) {
        const errorMessages = error.errors?.map((err) => `${err.path.join('.')}: ${err.message}`) ?? []
        throw new ApiError(400, errorMessages[0] || "Validation Error", null, errorMessages)
    }
}

```

### backend\src\models\book.model.js
```javascript
import mongoose, { Schema } from "mongoose"
/*
 Added `index: true` to fields like title, authors, and category because they are frequently searched.
 
 Without an index (Collection Scan): MongoDB has to read every single book in the database one-by-one to find a title.
 With an index: MongoDB creates an optimized B-Tree behind the scenes. It jumps instantly to the correct book, 
 just like using the index at the back of a physical encyclopedia!
 */

const bookSchema= new Schema({
    globalBookId: {
        type: String,
        unique: true,
        sparse: true 
    },
    title:{
        type:String,
        trim:true,
        required:true,
        index:true
    },
    authors:[
        {
            type:String,
            trim:true,
            required:true,
            index:true
        }
    ],
    category:[
        {
            type:String,
            trim:true,
            required:true,
            index:true
        }
    ],
    coverImg:{
        type:String
    },
    total:{
        type:Number,
        default:0
    },
    avl:{
        type:Number,
        default:0
    }
},
{
    timestamps: true,
    optimisticConcurrency: true
})

export const Book= mongoose.model("Book",bookSchema)

```

### backend\src\models\bookRequest.model.js
```javascript
import mongoose, { Schema } from "mongoose"
const bookRequestSchema= new Schema({
    s_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required : true,
    },
    isbn: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true })
export const BookRequest = mongoose.model("BookRequest", bookRequestSchema)
```

### backend\src\models\employee.model.js
```javascript
import mongoose, { Schema } from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import crypto from "crypto"
const employeeSchema =new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    empId:{
        type:Number,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:[true,'Password is required']
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    refreshToken: {
        type: String
    },
    forgotPasswordToken: {
        type: String
    },
    forgotPasswordExpiry: {
        type: Date
    }
},
{
    timestamps: true,
    optimisticConcurrency: true
})

employeeSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10)
})
employeeSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

employeeSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            empId: this.empId,
            name: this.name,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

employeeSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

employeeSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString("hex")
    this.forgotPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000 // 15 minutes
    return resetToken
}

export const Employee= mongoose.model("Employee",employeeSchema)

```

### backend\src\models\notification.model.js
```javascript
import mongoose, { Schema } from "mongoose"
const notificationSchema=new Schema({
    s_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student",
        required:true
    },
    msg:{
        type:String,
        trim:true,
        required:true
    },
    status:{
        type:String,
        enum:["Read","Unread"],
        default:"Unread"
    }
},
{
    timestamps:true
})

export const Notification=mongoose.model("Notification",notificationSchema)

```

### backend\src\models\order.model.js
```javascript
import mongoose, { Schema } from "mongoose"
const orderSchema = new Schema({
    globalBookId: {
        type: String, 
        required: true
    },
    orderTitle: {
        type: String,
        trim: true,
        required: true
    },
    authors: [
        {
            type: String,
            trim: true
        }
    ],
    category: [
        {
            type: String,
            trim: true
        }
    ],
    coverImg: {
        type: String
    },
    copiesOrdered: {
        type: Number,
        default: 1
    },
    requesters: [{
        type: Schema.Types.ObjectId,
        ref: "Student"
    }],
    status: {
        type: String,
        enum: ["Pending Delivery", "Received"],
        default: "Pending Delivery"
    }
}, { 
    timestamps: true,
    optimisticConcurrency: true
})

export const Order = mongoose.model("Order", orderSchema)
```

### backend\src\models\student.model.js
```javascript
import mongoose, { Schema } from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import crypto from "crypto"
const studentSchema =new Schema({

    cardNo:{
        type:Number,
        unique:true,
        index:true,
        sparse:true
    },
    name:{
        type:String,
        trim:true,
        required:true
    },
    dob:{
        type:Date,
        required:true,
    },
    addr:{
        type:String,
        trim:true,
        required:true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },

    govtId:{
        type:String,
        required:true
    },
    dept:{
        type:String,
        trim:true,
        required:true
    },
    rollNo:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:[true,'Password is required']
    },
    tot_fine:{
        type:Number,
        default:0
    },
    pendingEdits: {
        type: Schema.Types.Mixed,
        default: null
    },
    status:{
        type:String,
        enum:["Approved","Pending"],
        default:"Pending"
    },
    refreshToken: {
        type: String
    },
    forgotPasswordToken: {
        type: String
    },
    forgotPasswordExpiry: {
        type: Date
    }


},
{
    timestamps: true,
    optimisticConcurrency: true
})

studentSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10)
})

studentSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

studentSchema.methods.generateAccessToken = function(){
    if (!this.cardNo) {
        throw new Error("Cannot generate token: Student does not have a Library Card Number yet.")
    }

    return jwt.sign(
        {
            _id: this._id,
            rollNo: this.rollNo,
            cardNo: this.cardNo
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

studentSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

studentSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString("hex")
    this.forgotPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000 // 15 minutes
    return resetToken
}

export const Student= mongoose.model("Student",studentSchema)

```

### backend\src\models\studentRequest.model.js
```javascript
import mongoose, { Schema } from "mongoose"
const studentRequestSchema= new Schema({
    s_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Student",
        required:true
    },
    title:{
        type:String,
        trim:true,
        required:true
    },
    authors:[
        {
            type:String,
            required:true,
            trim:true,
        }
    ],
    category:[
        {
            type:String,
            required:true,
            trim:true,
        }
    ],
    status:{
        type:String,
        enum:["Approved","Pending"],
        default:"Pending"
    }
},
{
    timestamps:true
})

export const StudentRequest=mongoose.model("StudentRequest",studentRequestSchema)

```

### backend\src\models\transaction.model.js
```javascript
import mongoose, { Schema } from "mongoose"

const transactionSchema= new Schema({
    s_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Student",
        required:true
    },
    b_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Book",
        required:true
    },
    brwDate:{
        type: Date,
        default:Date.now
    },
    dueDate:{
        type: Date,
        required:true
    },
    renewalCnt:{
        type:Number,
        default:0,
        max:2
    },
    rtrnDate:{
        type:Date
    },
    frozenFine:{
        type:Number,
        default:0
    },
    amountCollected:{
        type:Number,
        default:0
    }
},
{
    timestamps:true,
    optimisticConcurrency: true
})

export const Transaction= mongoose.model("Transaction",transactionSchema)

```

### backend\src\routes\auth.routes.js
```javascript
import { Router } from "express"
import { forgotPassword, resetPassword } from "../controllers/auth.controller.js"
import { validate } from "../middlewares/validate.middleware.js"
import { forgotPasswordSchema, resetPasswordSchema } from "../validators/auth.validator.js"

const router = Router()

// Public Routes (Anyone can request a password reset)
router.route("/forgot-password").post(validate(forgotPasswordSchema), forgotPassword)
router.route("/reset-password/:token").post(validate(resetPasswordSchema), resetPassword)

export default router

```

### backend\src\routes\book.routes.js
```javascript
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

```

### backend\src\routes\employee.routes.js
```javascript
import { Router } from "express"
import { loginEmployee, logoutEmployee } from "../controllers/employee.controller.js"
import { verifyEmployee } from "../middlewares/auth.middleware.js"
import { validate } from "../middlewares/validate.middleware.js"
import { loginEmployeeSchema } from "../validators/employee.validator.js"
import rateLimit from "express-rate-limit"

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { success: false, message: "Too many attempts, please try again after 15 minutes" }
})

const router = Router()

router.route("/login").post(authLimiter, validate(loginEmployeeSchema), loginEmployee)

// Secured routes
router.route("/logout").post(verifyEmployee, logoutEmployee)

export default router

```

### backend\src\routes\management.routes.js
```javascript
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

```

### backend\src\routes\student.routes.js
```javascript
import { Router } from "express"
import { 
    registerStudent, 
    loginStudent, 
    logoutStudent, 
    getStudentProfile, 
    requestProfileUpdate 
} from "../controllers/student.controller.js"

import { upload } from "../middlewares/multer.middleware.js"
import { verifyStudent } from "../middlewares/auth.middleware.js"
import { validate } from "../middlewares/validate.middleware.js"
import { registerStudentSchema, loginStudentSchema, updateProfileSchema } from "../validators/student.validator.js"
import rateLimit from "express-rate-limit"

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { success: false, message: "Too many attempts, please try again after 15 minutes" }
})

const router = Router()

router.route("/register").post(
    upload.fields([
        { name: "govtId", maxCount: 1 }
    ]),
    validate(registerStudentSchema),
    registerStudent
)

router.route("/login").post(authLimiter, validate(loginStudentSchema), loginStudent)

// Secured routes
router.route("/logout").post(verifyStudent, logoutStudent)
router.route("/profile").get(verifyStudent, getStudentProfile)
router.route("/update-profile").post(verifyStudent, validate(updateProfileSchema), requestProfileUpdate)

export default router

```

### backend\src\routes\transaction.routes.js
```javascript
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

```

### backend\src\scripts\adminSetup.js
```javascript
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { Book } from '../models/book.model.js';
import { Student } from '../models/student.model.js';
import { Employee } from '../models/employee.model.js';
import { Transaction } from '../models/transaction.model.js';
import { BookRequest } from '../models/bookRequest.model.js';

import { seed } from '../../seed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  }
}

async function flushDatabase() {
  await connectDB();
  console.warn('⚠️ WARNING: Flushing entire database...');
  await Book.deleteMany({});
  await Student.deleteMany({});
  await Employee.deleteMany({});
  await Transaction.deleteMany({});
  await BookRequest.deleteMany({});
  console.log('Database flushed successfully.');
}

async function addEntity(entity, dataString) {
  await connectDB();
  const data = JSON.parse(dataString);
  let result;
  switch (entity.toLowerCase()) {
    case 'student':
      result = await Student.create(data);
      break;
    case 'employee':
      result = await Employee.create(data);
      break;
    case 'book':
      result = await Book.create(data);
      break;
    default:
      console.error('Invalid entity type. Use student, employee, or book.');
      process.exit(1);
  }
  console.log(`Successfully added ${entity}:`, result._id);
}

async function removeEntity(entity, id) {
  await connectDB();
  let result;
  switch (entity.toLowerCase()) {
    case 'student':
      result = await Student.findByIdAndDelete(id);
      break;
    case 'employee':
      result = await Employee.findByIdAndDelete(id);
      break;
    case 'book':
      result = await Book.findByIdAndDelete(id);
      break;
    default:
      console.error('Invalid entity type. Use student, employee, or book.');
      process.exit(1);
  }
  if (result) {
    console.log(`Successfully removed ${entity} with ID: ${id}`);
  } else {
    console.log(`${entity} with ID ${id} not found.`);
  }
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log(`
Usage:
  node adminSetup.js --add <entity> '<json_data>'
  node adminSetup.js --remove <entity> <id>
  node adminSetup.js --flush
  node adminSetup.js --seed
    `);
    process.exit(0);
  }

  const command = args[0];

  try {
    switch (command) {
      case '--add':
        if (args.length < 3) throw new Error('Missing arguments for --add');
        await addEntity(args[1], args[2]);
        break;
      case '--remove':
        if (args.length < 3) throw new Error('Missing arguments for --remove');
        await removeEntity(args[1], args[2]);
        break;
      case '--flush':
        await flushDatabase();
        break;
      case '--seed':
        await connectDB();
        await seed();
        break;
      default:
        console.error('Unknown command:', command);
    }
  } catch (error) {
    console.error('Error executing command:', error.message);
  } finally {
    process.exit(0);
  }
}

main();

```

### backend\src\utils\ApiError.js
```javascript
class ApiError extends Error {
    constructor(
        statusCode,
        customMessage = "Something went wrong",
        rawError = null,
        errors = []
    ) {
        const finalMessage = rawError ? `${customMessage}: ${rawError.message}` : customMessage
        super(finalMessage)
        this.statusCode = statusCode
        this.message = finalMessage
        this.errors = errors
        this.success = false
        this.data = null
        if (rawError) {
            console.error(`[ApiError Triggered] ${finalMessage}`)
            console.error(rawError)
        }

        if (rawError && rawError.stack) {
            this.stack = rawError.stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }
```

### backend\src\utils\ApiResponse.js
```javascript
class ApiResponse{
    constructor(
        statusCode,
        data,
        message="Success"
    )
    {
        this.statusCode=statusCode
        this.data=data
        this.message=message
        this.success=statusCode<400
    }
}

export {ApiResponse}
```

### backend\src\utils\asyncHandler.js
```javascript
const asyncHandler = (fn)=>{
    return (req,res,next) =>{
        Promise.resolve( fn(req,res,next) ).catch( (error)=> next(error) )
    }
}

export {asyncHandler}
```

### backend\src\utils\cloudinary.js
```javascript
import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
})
const uploadOnCloudinary = async (localFilePath)=>{
    try {

        if(!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        console.log("Upload successful",response)

        // delete temp file after upload
        fs.unlinkSync(localFilePath)
        return response

    } catch (error) {

        if (fs.existsSync(localFilePath)) 
        fs.unlinkSync(localFilePath)
        console.error(`[Cloudinary Upload Error] Failed to upload local file: ${localFilePath}`)
        console.error(error)
        return null
    }
}

const getPublicIdFromUrl= (url)=>{
    try{
        if(!url) return null

        const parts=url.split("/")
        const fileName= parts[parts.length-1]
        const publicId = fileName.split(".")[0]
        return publicId
    }
    catch (error) {
        console.error(`[Cloudinary URL Parser Error] Failed to extract ID from URL: ${url}`)
        console.error(error)
        return null
    }
}

const deleteFromCloudinary = async (imageUrl) => {
    try {
        if (!imageUrl) return

        const publicId = getPublicIdFromUrl(imageUrl)
        if (!publicId) return

        await cloudinary.uploader.destroy(publicId, {
            resource_type: "auto"
        })

    } catch (error) {
        console.error(`[Cloudinary Delete Error] Failed to delete image: ${imageUrl}`)
        console.error(error)
    }
}


export {
    uploadOnCloudinary,
    deleteFromCloudinary
}
```

### backend\src\utils\googleBooksAPI.js
```javascript
import { ApiError } from "./ApiError.js"
export const searchGlobalBook = async (isbn) => {
    try {
        const queryStr = `isbn:${encodeURIComponent(isbn)}`
        const apiKey = process.env.GOOGLE_BOOKS_API_KEY
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${queryStr}&maxResults=1&key=${apiKey}`)
        if (!response.ok) throw new Error("Failed to search Google Books")
        const data = await response.json()
        if (!data.items || data.items.length === 0) {
            return null
        }
        
        const match = data.items[0]
        return {
            globalBookId: match.id,
            orderTitle: match.volumeInfo.title,
            authors: match.volumeInfo.authors || [],
            category: match.volumeInfo.categories || ["General"],
            coverImg: match.volumeInfo.imageLinks?.thumbnail?.replace("http:", "https:") || ""
        }
    } catch (error) {
        throw new ApiError(500, "Error searching global catalogue", error)
    }
}
```

### backend\src\utils\mailer.js
```javascript
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})

export const sendMail = async (to, subject, htmlContent) => {
    try {
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
            console.log(`\n=== [MAILER MOCK] ===\nTo: ${to}\nSubject: ${subject}\n=====================\n`)
            return { success: true, message: "Mock email sent (Missing SMTP Credentials)" }
        }

        const info = await transporter.sendMail({
            from: `"Library Management System" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html: htmlContent
        })

        return { success: true, messageId: info.messageId }
    } catch (error) {
        console.error("Error sending email:", error)
        return { success: false, error }
    }
}

```

### backend\src\utils\sessionWrapper.js
```javascript
import mongoose from "mongoose"

const sessionWrapper = async (callback) => {

    const session = await mongoose.startSession()

    session.startTransaction()
    try {

        const result = await callback(session)
        await session.commitTransaction()
        session.endSession()
        return result
    } 
    catch (error) {

        await session.abortTransaction()
        session.endSession()
        throw error
    }
}

export {sessionWrapper}
```

### backend\src\validators\auth.validator.js
```javascript
import { z } from "zod"

export const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
    role: z.enum(["student", "employee"], {
        required_error: "Role is required (student or employee)"
    })
})

export const resetPasswordSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

```

### backend\src\validators\book.validator.js
```javascript
import { z } from "zod"

export const requestBookSchema = z.object({
    isbn: z.string().min(1, "ISBN is required")
})

export const rejectRequestSchema = z.object({
    requestIds: z.array(z.string()).min(1, "Please provide an array of request IDs to reject")
})

export const placeOrderSchema = z.object({
    isbn: z.string().min(1, "ISBN is required"),
    copiesOrdered: z.number().int().positive("Copies ordered must be a positive integer"),
    requestIds: z.array(z.string()).min(1, "Please provide an array of request IDs to fulfill")
})

export const manualOrderSchema = z.object({
    isbn: z.string().min(1, "ISBN is required"),
    copiesOrdered: z.number().int().positive("Copies ordered must be a positive integer")
})

```

### backend\src\validators\communication.validator.js
```javascript
import { z } from "zod"

export const submitFeedbackSchema = z.object({
    msg: z.string().min(1, "Message is required")
})

export const replyToFeedbackSchema = z.object({
    feedBackId: z.string().min(1, "Feedback ID is required"),
    replyMsg: z.string().min(1, "Reply message is required")
})

```

### backend\src\validators\employee.validator.js
```javascript
import { z } from "zod"

export const loginEmployeeSchema = z.object({
    empId: z.string().min(1, "Employee ID is required"),
    password: z.string().min(1, "Password is required")
})

```

### backend\src\validators\management.validator.js
```javascript
import { z } from "zod"

export const approveStudentSchema = z.object({
    studentId: z.string().min(1, "Student ID is required")
})

export const rejectStudentSchema = z.object({
    studentId: z.string().min(1, "Student ID is required"),
    reason: z.string().min(1, "Rejection reason is required")
})

export const approveEditSchema = z.object({
    studentId: z.string().min(1, "Student ID is required")
})

export const rejectEditSchema = z.object({
    studentId: z.string().min(1, "Student ID is required"),
    reason: z.string().min(1, "Rejection reason is required")
})

```

### backend\src\validators\student.validator.js
```javascript
import { z } from "zod"

export const registerStudentSchema = z.object({
    name: z.string().min(1, "Name is required"),
    dob: z.string().min(1, "Date of birth is required"),
    addr: z.string().min(1, "Address is required"),
    email: z.string().email("Invalid email address"),
    dept: z.string().min(1, "Department is required"),
    rollNo: z.string().min(1, "Roll number is required"),
    password: z.string().min(6, "Password must be at least 6 characters")
})

export const loginStudentSchema = z.object({
    cardNo: z.string().min(1, "Card number is required"),
    password: z.string().min(1, "Password is required")
})

export const updateProfileSchema = z.object({
    name: z.string().optional(),
    dob: z.string().optional(),
    addr: z.string().optional(),
    email: z.string().email("Invalid email address").optional(),
    dept: z.string().optional(),
    rollNo: z.string().optional()
}).refine(data => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update"
})

```

### backend\src\validators\transaction.validator.js
```javascript
import { z } from "zod"

export const borrowBookSchema = z.object({
    cardNo: z.string().min(1, "Card number is required"),
    isbn: z.string().min(1, "ISBN is required")
})

export const returnBookSchema = z.object({
    cardNo: z.string().min(1, "Card number is required"),
    isbn: z.string().min(1, "ISBN is required")
})

export const renewBookSchema = z.object({
    transactionId: z.string().min(1, "Transaction ID is required")
})

export const payFineSchema = z.object({
    transactionId: z.string().min(1, "Transaction ID is required"),
    payAll: z.boolean({
        required_error: "payAll flag is required",
        invalid_type_error: "payAll must be a boolean"
    })
})

```

### frontend\.env
```
VITE_TAWKTO_PROPERTY_ID=6a57cedbb598841d48def25b/1jtjg036e
VITE_API_URL=http://localhost:8000/api

```

### frontend\.env.example
```example
VITE_API_URL=http://localhost:8000/api
VITE_TAWKTO_PROPERTY_ID=your_tawkto_property_id

```

### frontend\.gitignore
```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Node
node_modules
dist
dist-ssr
*.local

# Environment variables
.env
.env.*
!.env.example

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

```

### frontend\.oxlintrc.json
```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}

```

### frontend\index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Library — Management System</title>
    <meta name="description" content="Enterprise-grade Library Management System for students and staff." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Roboto+Mono:wght@300;400;500&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

```

### frontend\package.json
```json
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "oxlint",
    "preview": "vite preview"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.4.0",
    "@phosphor-icons/react": "^2.1.10",
    "@tailwindcss/vite": "^4.3.2",
    "@tanstack/react-query": "^5.101.2",
    "axios": "^1.18.1",
    "framer-motion": "^12.42.2",
    "react": "^19.2.7",
    "react-dom": "^19.2.7",
    "react-hook-form": "^7.81.0",
    "react-hot-toast": "^2.6.0",
    "react-router-dom": "^7.18.1",
    "tailwindcss": "^4.3.2",
    "zod": "^4.4.3"
  },
  "devDependencies": {
    "@types/node": "^24.13.2",
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.3",
    "oxlint": "^1.71.0",
    "typescript": "~6.0.2",
    "vite": "^8.1.1"
  }
}

```

### frontend\public\_redirects
```
/*    /index.html   200

```

### frontend\README.md
```markdown
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

```

### frontend\src\api\client.ts
```typescript
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
})

export default api

```

### frontend\src\api\index.ts
```typescript
import api from './client'

export const studentLogin = (data: { cardNo: string; password: string }) =>
  api.post('/students/login', data).then((r) => r.data)

export const studentLogout = () =>
  api.post('/students/logout').then((r) => r.data)

export const getStudentProfile = () =>
  api.get('/students/profile').then((r) => r.data)

export const registerStudent = (formData: FormData) =>
  api.post('/students/register', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((r) => r.data)

export const requestProfileUpdate = (data: Record<string, string>) =>
  api.post('/students/update-profile', data).then((r) => r.data)

export const employeeLogin = (data: { empId: string; password: string }) =>
  api.post('/employees/login', data).then((r) => r.data)

export const employeeLogout = () =>
  api.post('/employees/logout').then((r) => r.data)

export const forgotPassword = (data: { email: string; role: 'student' | 'employee' }) =>
  api.post('/auth/forgot-password', data).then((r) => r.data)

export const resetPassword = (token: string, data: { password: string; confirmPassword: string }) =>
  api.post(`/auth/reset-password/${token}`, data).then((r) => r.data)

export const searchBooks = (params: { search?: string; category?: string }) =>
  api.get('/books/search', { params }).then((r) => r.data)

export const getCategories = () =>
  api.get('/books/categories').then((r) => r.data)

export const getBookById = (bookId: string) =>
  api.get(`/books/${bookId}`).then((r) => r.data)

export const requestBook = (data: { isbn: string }) =>
  api.post('/books/request', data).then((r) => r.data)

export const getTransactionHistory = () =>
  api.get('/transactions/history').then((r) => r.data)

export const renewBook = (data: { transactionId: string }) =>
  api.post('/transactions/renew', data).then((r) => r.data)

export const payFine = (data: { transactionId?: string; payAll?: boolean }) =>
  api.post('/transactions/pay-fine', data).then((r) => r.data)

export const borrowBook = (data: { cardNo: string; isbn: string }) =>
  api.post('/transactions/borrow', data).then((r) => r.data)

export const returnBook = (data: { cardNo: string; isbn: string }) =>
  api.post('/transactions/return', data).then((r) => r.data)

export const getPendingStudents = () =>
  api.get('/management/pending-students').then((r) => r.data)

export const approveStudent = (data: { studentId: string }) =>
  api.post('/management/approve-student', data).then((r) => r.data)

export const rejectStudent = (data: { studentId: string; reason: string }) =>
  api.post('/management/reject-student', data).then((r) => r.data)

export const getPendingEdits = () =>
  api.get('/management/edits/pending').then((r) => r.data)

export const approveEdit = (data: { studentId: string }) =>
  api.post('/management/approve-edit', data).then((r) => r.data)

export const rejectEdit = (data: { studentId: string; reason: string }) =>
  api.post('/management/reject-edit', data).then((r) => r.data)

export const getAggregatedRequests = () =>
  api.get('/books/requests/aggregated').then((r) => r.data)

export const rejectBookRequest = (data: { requestIds: string[] }) =>
  api.post('/books/requests/reject', data).then((r) => r.data)

export const getAllOrders = () =>
  api.get('/books/orders').then((r) => r.data)

export const placeOrder = (data: { isbn: string; copiesOrdered: number; requestIds: string[] }) =>
  api.post('/books/orders/place', data).then((r) => r.data)

export const manualOrder = (data: { isbn: string; copiesOrdered: number }) =>
  api.post('/books/orders/manual', data).then((r) => r.data)

export const receiveOrder = (orderId: string) =>
  api.post(`/books/orders/receive/${orderId}`).then((r) => r.data)

```

### frontend\src\App.tsx
```tsx
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuth } from './context/AuthContext'

import LandingPage from './features/public/LandingPage'
import StudentLoginPage from './features/auth/StudentLoginPage'
import EmployeeLoginPage from './features/auth/EmployeeLoginPage'
import RegisterPage from './features/auth/RegisterPage'
import ForgotPasswordPage from './features/auth/ForgotPasswordPage'
import ResetPasswordPage from './features/auth/ResetPasswordPage'
import CataloguePage from './features/public/CataloguePage'

import StudentLayout from './components/layout/StudentLayout'
import StudentDashboard from './features/student/StudentDashboard'
import StudentCataloguePage from './features/student/StudentCataloguePage'
import StudentHistoryPage from './features/student/StudentHistoryPage'

import EmployeeLayout from './components/layout/EmployeeLayout'
import EmployeeDashboard from './features/employee/EmployeeDashboard'
import PendingStudentsPage from './features/employee/PendingStudentsPage'
import PendingEditsPage from './features/employee/PendingEditsPage'
import BookRequestsPage from './features/employee/BookRequestsPage'
import EmployeeCataloguePage from './features/employee/EmployeeCataloguePage'
import OrdersPage from './features/employee/OrdersPage'
import FloatingContactBtn from './components/FloatingContactBtn'

function ProtectedRoute({ children, role }: { children: React.ReactNode; role: 'student' | 'employee' }) {
  const { state } = useAuth()
  if (!state.isAuthenticated || state.user?.role !== role) {
    return <Navigate to="/" replace />
  }
  return <>{children}</>
}

export default function App() {
  return (
    <>
    <Routes>
      
      <Route path="/" element={<LandingPage />} />
      <Route path="/login/student" element={<StudentLoginPage />} />
      <Route path="/login/employee" element={<EmployeeLoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      <Route path="/catalogue" element={<CataloguePage />} />

      
      <Route
        path="/student/*"
        element={
          <ProtectedRoute role="student">
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="catalogue" element={<StudentCataloguePage />} />
        <Route path="history" element={<StudentHistoryPage />} />
      </Route>

      
      <Route
        path="/employee/*"
        element={
          <ProtectedRoute role="employee">
            <EmployeeLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<EmployeeDashboard />} />
        <Route path="students/pending" element={<PendingStudentsPage />} />
        <Route path="edits/pending" element={<PendingEditsPage />} />
        <Route path="requests" element={<BookRequestsPage />} />
        <Route path="catalogue" element={<EmployeeCataloguePage />} />
        <Route path="orders" element={<OrdersPage />} />
      </Route>

      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    <Toaster 
      position="bottom-right"
      toastOptions={{
        style: {
          background: 'var(--color-bg-surface)',
          color: 'var(--color-text-primary)',
          border: '2px solid var(--color-border)',
          borderRadius: '0px',
          boxShadow: '4px 4px 0px 0px #111111',
          fontFamily: 'var(--font-sans)',
          fontWeight: 500,
        },
        success: {
          iconTheme: {
            primary: 'var(--color-accent-seafoam)',
            secondary: '#111111',
          },
        },
        error: {
          iconTheme: {
            primary: 'var(--color-accent-rose)',
            secondary: '#111111',
          },
        },
      }}
    />
    <FloatingContactBtn />
    </>
  )
}

```

### frontend\src\components\FloatingContactBtn.tsx
```tsx
import { useEffect } from 'react'
import { ChatCircleDots, EnvelopeSimple } from '@phosphor-icons/react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

declare global {
  interface Window {
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
  }
}

export default function FloatingContactBtn() {
  const { state } = useAuth()
  const isEmployee = state.user?.role === 'employee'

  useEffect(() => {
    if (!isEmployee) {
      const propertyId = import.meta.env.VITE_TAWKTO_PROPERTY_ID
      
      if (!propertyId) return

      window.Tawk_API = window.Tawk_API || {}
      window.Tawk_LoadStart = new Date()
      
      window.Tawk_API.onLoad = function() {
        window.Tawk_API.hideWidget()
        if (state.user) {
          window.Tawk_API.setAttributes({
            name: state.user.name || state.user.email,
            email: state.user.email,
            ...(state.user.rollNo ? { 'Roll Number': state.user.rollNo } : {})
          }, function(error: any) {})
        }
      }

      const script = document.createElement('script')
      script.async = true
      script.src = `https://embed.tawk.to/${propertyId}`
      script.charset = 'UTF-8'
      script.setAttribute('crossorigin', '*')
      document.head.appendChild(script)

      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script)
        }
      }
    }
  }, [isEmployee])

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    
    if (isEmployee) {
      window.open('https://dashboard.tawk.to/', '_blank')
    } else {
      if (window.Tawk_API && typeof window.Tawk_API.toggle === 'function') {
        window.Tawk_API.toggle()
      } else {
        toast('Helpdesk widget (Tawk.to) not configured.\\nPlease set VITE_TAWKTO_PROPERTY_ID in your .env', {
          icon: '🛠️'
        })
      }
    }
  }

  if (isEmployee) {
    return (
      <a
        href="https://dashboard.tawk.to/"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-contact-btn"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          backgroundColor: 'var(--color-bg-inverse)',
          color: 'var(--color-text-inverse)',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '4px 4px 0px 0px #111111',
          border: '2px solid #111111',
          cursor: 'pointer',
          transition: 'transform 150ms ease, box-shadow 150ms ease',
          zIndex: 1000,
        }}
        title="Open Shared Inbox"
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translate(-2px, -2px)'
          e.currentTarget.style.boxShadow = '6px 6px 0px 0px #111111'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translate(0px, 0px)'
          e.currentTarget.style.boxShadow = '4px 4px 0px 0px #111111'
        }}
      >
        <EnvelopeSimple size={24} weight="bold" />
      </a>
    )
  }

  return (
    <button
      onClick={handleClick}
      className="floating-contact-btn"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        backgroundColor: 'var(--color-bg-inverse)',
        color: 'var(--color-text-inverse)',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '4px 4px 0px 0px #111111',
        border: '2px solid #111111',
        cursor: 'pointer',
        transition: 'transform 150ms ease, box-shadow 150ms ease',
        zIndex: 1000,
      }}
      title="Contact Support"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translate(-2px, -2px)'
        e.currentTarget.style.boxShadow = '6px 6px 0px 0px #111111'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translate(0px, 0px)'
        e.currentTarget.style.boxShadow = '4px 4px 0px 0px #111111'
      }}
    >
      <ChatCircleDots size={24} weight="bold" />
    </button>
  )
}

```

### frontend\src\components\layout\EmployeeLayout.tsx
```tsx
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { House, Users, UserList, BookOpen, Receipt, ShoppingCart, SignOut, List } from '@phosphor-icons/react'
import { useAuth } from '../../context/AuthContext'
import { employeeLogout } from '../../api'
import { useState, useEffect } from 'react'

export default function EmployeeLayout() {
  const { state, dispatch } = useAuth()
  const navigate = useNavigate()
  
  const [collapsed, setCollapsed] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setCollapsed(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleLogout = async () => {
    try {
      await employeeLogout()
    } catch (err) {
      console.error(err)
    } finally {
      dispatch({ type: 'LOGOUT' })
      navigate('/')
    }
  }

  const navItems = [
    { name: 'Dashboard', path: '/employee/dashboard', icon: <House size={20} /> },
    { name: 'Pending Students', path: '/employee/students/pending', icon: <Users size={20} /> },
    { name: 'Pending Edits', path: '/employee/edits/pending', icon: <UserList size={20} /> },
    { name: 'Book Requests', path: '/employee/requests', icon: <Receipt size={20} /> },
    { name: 'Catalogue', path: '/employee/catalogue', icon: <BookOpen size={20} /> },
    { name: 'Orders', path: '/employee/orders', icon: <ShoppingCart size={20} /> },
  ]

  const sidebarWidth = collapsed ? '80px' : '260px'

  return (
    <div style={styles.layout}>
      <aside style={{ ...styles.sidebar, width: sidebarWidth }}>
        <div style={{ ...styles.brand, justifyContent: collapsed ? 'center' : 'space-between', padding: collapsed ? '0' : '0 1.5rem' }}>
          {!collapsed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={styles.brandLogo}>Lib</div>
              <span style={styles.brandText}>Employee Portal</span>
            </div>
          )}
          <button 
            onClick={() => setCollapsed(!collapsed)} 
            style={styles.collapseBtn}
            title="Toggle Sidebar"
          >
            <List size={20} />
          </button>
        </div>

        <nav style={{ ...styles.nav, padding: collapsed ? '1.5rem 0' : '1.5rem 1rem', alignItems: collapsed ? 'center' : 'stretch' }}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                ...styles.navLink,
                backgroundColor: isActive ? 'var(--color-bg-surface)' : 'transparent',
                color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                fontWeight: isActive ? 500 : 400,
                justifyContent: collapsed ? 'center' : 'flex-start',
                padding: collapsed ? '1rem' : '0.75rem 1rem',
              })}
              title={item.name}
            >
              {item.icon}
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        <div style={{ ...styles.userSection, flexDirection: collapsed ? 'column' : 'row', padding: collapsed ? '1.25rem 0' : '1.25rem', gap: collapsed ? '1rem' : '0' }}>
          {!collapsed && (
            <div style={styles.userInfo}>
              <p style={styles.userName}>Name: {state.user?.name || (state.user as any)?.employee?.name || 'Employee'}</p>
              <p style={styles.userRole}>ID: {state.user?.empId || (state.user as any)?.employee?.empId || 'N/A'}</p>
            </div>
          )}
          <button onClick={handleLogout} style={styles.logoutBtn} aria-label="Logout" title="Logout">
            <SignOut size={20} />
          </button>
        </div>
      </aside>

      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  layout: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: 'var(--color-bg-base)',
  },
  sidebar: {
    backgroundColor: 'var(--color-bg-base)',
    borderRight: '2px solid var(--color-border)',
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    top: 0,
    height: '100vh',
    transition: 'width 200ms ease',
  },
  brand: {
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '2px solid var(--color-border)',
  },
  brandLogo: {
    width: '32px',
    height: '32px',
    backgroundColor: 'var(--color-text-primary)',
    color: 'var(--color-bg-base)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--font-sans)',
    fontWeight: 700,
    fontSize: '14px',
    borderRadius: '4px',
    flexShrink: 0,
  },
  brandText: {
    fontFamily: 'var(--font-mono)',
    fontSize: '13px',
    color: 'var(--color-text-primary)',
    letterSpacing: '0.05em',
    whiteSpace: 'nowrap',
  },
  collapseBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    flex: 1,
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    borderRadius: 'var(--radius-md)',
    textDecoration: 'none',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    transition: 'all 150ms ease',
    whiteSpace: 'nowrap',
  },
  userSection: {
    borderTop: '2px solid var(--color-border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  userName: {
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--color-text-primary)',
    margin: 0,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  userRole: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    color: 'var(--color-text-muted)',
    margin: '4px 0 0 0',
    whiteSpace: 'nowrap',
  },
  logoutBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: 'var(--radius-sm)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'color 150ms ease, background-color 150ms ease',
  },
  main: {
    flex: 1,
    overflowY: 'auto',
    position: 'relative',
    minWidth: 0,
  },
}

```

### frontend\src\components\layout\StudentLayout.tsx
```tsx
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { House, BookOpen, ClockCounterClockwise, SignOut, List } from '@phosphor-icons/react'
import { useAuth } from '../../context/AuthContext'
import { studentLogout } from '../../api'
import { useState, useEffect } from 'react'

export default function StudentLayout() {
  const { state, dispatch } = useAuth()
  const navigate = useNavigate()
  
  const [collapsed, setCollapsed] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setCollapsed(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleLogout = async () => {
    try {
      await studentLogout()
    } catch (err) {
      console.error(err)
    } finally {
      dispatch({ type: 'LOGOUT' })
      navigate('/')
    }
  }

  const navItems = [
    { name: 'Dashboard', path: '/student/dashboard', icon: <House size={20} /> },
    { name: 'Catalogue', path: '/student/catalogue', icon: <BookOpen size={20} /> },
    { name: 'History', path: '/student/history', icon: <ClockCounterClockwise size={20} /> },
  ]

  const sidebarWidth = collapsed ? '80px' : '260px'

  return (
    <div style={styles.layout}>
      <aside style={{ ...styles.sidebar, width: sidebarWidth }}>
        <div style={{ ...styles.brand, justifyContent: collapsed ? 'center' : 'space-between', padding: collapsed ? '0' : '0 1.5rem' }}>
          {!collapsed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={styles.brandLogo}>Lib</div>
              <span style={styles.brandText}>Student Portal</span>
            </div>
          )}
          <button 
            onClick={() => setCollapsed(!collapsed)} 
            style={styles.collapseBtn}
            title="Toggle Sidebar"
          >
            <List size={20} />
          </button>
        </div>

        <nav style={{ ...styles.nav, padding: collapsed ? '1.5rem 0' : '1.5rem 1rem', alignItems: collapsed ? 'center' : 'stretch' }}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                ...styles.navLink,
                backgroundColor: isActive ? 'var(--color-bg-surface)' : 'transparent',
                color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                fontWeight: isActive ? 500 : 400,
                justifyContent: collapsed ? 'center' : 'flex-start',
                padding: collapsed ? '1rem' : '0.75rem 1rem',
              })}
              title={item.name}
            >
              {item.icon}
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        <div style={{ ...styles.userSection, flexDirection: collapsed ? 'column' : 'row', padding: collapsed ? '1.25rem 0' : '1.25rem', gap: collapsed ? '1rem' : '0' }}>
          {!collapsed && (
            <div style={styles.userInfo}>
              <p style={styles.userName}>Name: {state.user?.name || (state.user as any)?.student?.name || 'Student'}</p>
              <p style={styles.userRole}>Card: {state.user?.cardNo || (state.user as any)?.student?.cardNo || 'N/A'}</p>
            </div>
          )}
          <button onClick={handleLogout} style={styles.logoutBtn} aria-label="Logout" title="Logout">
            <SignOut size={20} />
          </button>
        </div>
      </aside>

      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  layout: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: 'var(--color-bg-base)',
  },
  sidebar: {
    backgroundColor: 'var(--color-bg-base)',
    borderRight: '2px solid var(--color-border)',
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    top: 0,
    height: '100vh',
    transition: 'width 200ms ease',
  },
  brand: {
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '2px solid var(--color-border)',
  },
  brandLogo: {
    width: '32px',
    height: '32px',
    backgroundColor: 'var(--color-text-primary)',
    color: 'var(--color-bg-base)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--font-sans)',
    fontWeight: 700,
    fontSize: '14px',
    borderRadius: '4px',
    flexShrink: 0,
  },
  brandText: {
    fontFamily: 'var(--font-mono)',
    fontSize: '13px',
    color: 'var(--color-text-primary)',
    letterSpacing: '0.05em',
    whiteSpace: 'nowrap',
  },
  collapseBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    flex: 1,
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    borderRadius: 'var(--radius-md)',
    textDecoration: 'none',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    transition: 'all 150ms ease',
    whiteSpace: 'nowrap',
  },
  userSection: {
    borderTop: '2px solid var(--color-border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  userName: {
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--color-text-primary)',
    margin: 0,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  userRole: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    color: 'var(--color-text-muted)',
    margin: '4px 0 0 0',
    whiteSpace: 'nowrap',
  },
  logoutBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: 'var(--radius-sm)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'color 150ms ease, background-color 150ms ease',
  },
  main: {
    flex: 1,
    overflowY: 'auto',
    position: 'relative',
    minWidth: 0, // prevents flex item from overflowing
  },
}

```

### frontend\src\context\AuthContext.tsx
```tsx
import React, { createContext, useContext, useReducer } from 'react'
import type { AuthUser } from '../types/auth'

interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
}

type AuthAction =
  | { type: 'LOGIN'; payload: AuthUser }
  | { type: 'LOGOUT' }

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload, isAuthenticated: true }
    case 'LOGOUT':
      return { user: null, isAuthenticated: false }
    default:
      return state
  }
}

interface AuthContextValue {
  state: AuthState
  dispatch: React.Dispatch<AuthAction>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
  })

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

```

### frontend\src\features\auth\EmployeeLoginPage.tsx
```tsx
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { employeeLogin } from '../../api'
import { ArrowLeft } from '@phosphor-icons/react'

const schema = z.object({
  empId: z.string().min(1, 'Employee ID is required'),
  password: z.string().min(1, 'Password is required'),
})
type FormData = z.infer<typeof schema>

export default function EmployeeLoginPage() {
  const navigate = useNavigate()
  const { dispatch } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const mutation = useMutation({
    mutationFn: employeeLogin,
    onSuccess: (data) => {
      dispatch({
        type: 'LOGIN',
        payload: { ...(data.data.employee || data.data), role: 'employee' },
      })
      toast.success('Login successful!')
      navigate('/employee/dashboard')
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Login failed. Please try again.')
    }
  })

  const onSubmit = (data: FormData) => mutation.mutate(data)

  return (
    <div style={styles.page}>
      
      <div className="animate-in" style={styles.backRow}>
        <Link to="/" style={styles.backLink}>
          <ArrowLeft size={14} />
          Library
        </Link>
      </div>

      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        style={styles.card}
      >
        
        <div style={styles.cardHeader}>
          <p style={styles.eyebrow}>Employee Portal</p>
          <h1 style={styles.title}>Sign in</h1>
          <p style={styles.subtitle}>Enter your employee ID and password.</p>
        </div>

        
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form} noValidate>
          <div style={styles.field}>
            <label htmlFor="empId">Employee ID</label>
            <input
              id="empId"
              type="text"
              placeholder="e.g. 1001"
              className={`input ${errors.empId ? 'input-error' : ''}`}
              {...register('empId')}
            />
            {errors.empId && (
              <span className="field-error">{errors.empId.message}</span>
            )}
          </div>

          <div style={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className={`input ${errors.password ? 'input-error' : ''}`}
              {...register('password')}
            />
            {errors.password && (
              <span className="field-error">{errors.password.message}</span>
            )}
          </div>

          

          <button
            type="submit"
            className="btn btn-primary"
            disabled={mutation.isPending}
            style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
          >
            {mutation.isPending ? 'Signing in…' : 'Sign in →'}
          </button>
        </form>

        
        <div style={styles.footerLinks}>
          <Link to="/forgot-password" style={styles.link}>
            Forgot password?
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    backgroundColor: 'var(--color-bg-base)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    position: 'relative',
  },
  backRow: {
    position: 'absolute',
    top: '1.5rem',
    left: '1.5rem',
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    textDecoration: 'none',
    letterSpacing: '0.04em',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: 'var(--color-bg-card)',
    border: '2px solid var(--color-border)',
    boxShadow: '4px 4px 0px 0px #111111',
    padding: '2.5rem',
  },
  cardHeader: {
    marginBottom: '2rem',
  },
  eyebrow: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: 'var(--color-accent-seafoam)',
    margin: '0 0 0.75rem 0',
  },
  title: {
    fontFamily: 'var(--font-sans)',
    fontSize: '1.75rem',
    fontWeight: 600,
    letterSpacing: '-0.02em',
    color: 'var(--color-text-primary)',
    margin: '0 0 0.5rem 0',
  },
  subtitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    color: 'var(--color-text-secondary)',
    margin: 0,
    lineHeight: 1.6,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
  },
  apiError: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'var(--color-accent-rose-dim)',
    border: '1px solid var(--color-accent-rose)',
    borderRadius: 'var(--radius-sm)',
    padding: '10px 14px',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--color-accent-rose)',
  },
  footerLinks: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1.75rem',
  },
  link: {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    textDecoration: 'none',
    letterSpacing: '0.02em',
  },
}

```

### frontend\src\features\auth\ForgotPasswordPage.tsx
```tsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import { forgotPassword } from '../../api'
import { ArrowLeft, CheckCircle } from '@phosphor-icons/react'

const schema = z.object({
  email: z.string().email('Valid email is required'),
  role: z.enum(['student', 'employee']),
})
type FormData = z.infer<typeof schema>

export default function ForgotPasswordPage() {
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { role: 'student' },
  })

  const mutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      setSuccess(true)
      toast.success('Reset link sent!')
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to send reset link.')
    }
  })

  const onSubmit = (data: FormData) => mutation.mutate(data)

  return (
    <div style={styles.page}>
      
      <div className="animate-in" style={styles.backRow}>
        <Link to="/login/student" style={styles.backLink}>
          <ArrowLeft size={14} />
          Back to login
        </Link>
      </div>

      
      <div className="animate-in" style={styles.card}>
        <div style={styles.cardHeader}>
          <p style={styles.eyebrow}>Account Recovery</p>
          <h1 style={styles.title}>Forgot password</h1>
          <p style={styles.subtitle}>
            Enter your email and role to receive a reset link.
          </p>
        </div>

        {success ? (
          <div style={styles.successState}>
            <CheckCircle size={48} color="var(--color-accent-seafoam)" weight="light" />
            <p style={{ margin: '1rem 0 0', fontWeight: 500, color: 'var(--color-text-primary)' }}>
              Check your email
            </p>
            <p style={{ margin: '0.5rem 0 0', fontSize: '13px', color: 'var(--color-text-secondary)', textAlign: 'center' }}>
              We've sent a password reset link to your email address. It will expire in 15 minutes.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} style={styles.form} noValidate>
            <div style={styles.field}>
              <label>Select Role</label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <div style={styles.roleGroup}>
                    <button
                      type="button"
                      onClick={() => field.onChange('student')}
                      style={{
                        ...styles.roleBtn,
                        borderColor: field.value === 'student' ? 'var(--color-accent-lavender)' : 'var(--color-border)',
                        color: field.value === 'student' ? 'var(--color-accent-lavender)' : 'var(--color-text-secondary)',
                      }}
                    >
                      Student
                    </button>
                    <button
                      type="button"
                      onClick={() => field.onChange('employee')}
                      style={{
                        ...styles.roleBtn,
                        borderColor: field.value === 'employee' ? 'var(--color-accent-seafoam)' : 'var(--color-border)',
                        color: field.value === 'employee' ? 'var(--color-accent-seafoam)' : 'var(--color-text-secondary)',
                      }}
                    >
                      Employee
                    </button>
                  </div>
                )}
              />
              {errors.role && <span className="field-error">{errors.role.message}</span>}
            </div>

            <div style={styles.field}>
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className={`input ${errors.email ? 'input-error' : ''}`}
                {...register('email')}
              />
              {errors.email && (
                <span className="field-error">{errors.email.message}</span>
              )}
            </div>

            

            <button
              type="submit"
              className="btn btn-primary"
              disabled={mutation.isPending}
              style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
            >
              {mutation.isPending ? 'Sending...' : 'Send Reset Link →'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    backgroundColor: 'var(--color-bg-base)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    position: 'relative',
  },
  backRow: {
    position: 'absolute',
    top: '1.5rem',
    left: '1.5rem',
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    textDecoration: 'none',
    letterSpacing: '0.04em',
    transition: 'color 150ms ease',
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    backgroundColor: 'var(--color-bg-card)',
    border: '2px solid var(--color-border)',
    boxShadow: '4px 4px 0px 0px #111111',
    padding: '2.5rem',
  },
  cardHeader: {
    marginBottom: '2rem',
  },
  eyebrow: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: 'var(--color-text-muted)',
    margin: '0 0 0.75rem 0',
  },
  title: {
    fontFamily: 'var(--font-sans)',
    fontSize: '1.75rem',
    fontWeight: 600,
    letterSpacing: '-0.02em',
    color: 'var(--color-text-primary)',
    margin: '0 0 0.5rem 0',
  },
  subtitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    color: 'var(--color-text-secondary)',
    margin: 0,
    lineHeight: 1.6,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
  },
  roleGroup: {
    display: 'flex',
    gap: '0.5rem',
  },
  roleBtn: {
    flex: 1,
    background: 'var(--color-bg-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    padding: '10px',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 200ms ease',
  },
  apiError: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'var(--color-accent-rose-dim)',
    border: '1px solid var(--color-accent-rose)',
    borderRadius: 'var(--radius-sm)',
    padding: '10px 14px',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--color-accent-rose)',
  },
  successState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem 0',
  },
}

```

### frontend\src\features\auth\RegisterPage.tsx
```tsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import { registerStudent } from '../../api'
import { ArrowLeft, CheckCircle, UploadSimple } from '@phosphor-icons/react'

const MAX_FILE_SIZE = 5000000 // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Valid email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  department: z.string().min(2, 'Department is required'),
  rollNo: z.string().min(1, 'Roll No is required'),
  dob: z.string().min(1, 'Date of Birth is required'),
  addr: z.string().min(5, 'Address must be at least 5 characters'),
  photo: z
    .any()
    .refine((files) => files?.length == 1, 'Photo is required.')
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    ),
  govtId: z
    .any()
    .refine((files) => files?.length == 1, 'Govt ID is required.')
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    ),
})
type FormData = z.infer<typeof schema>

export default function RegisterPage() {
  const [success, setSuccess] = useState(false)
  const [step, setStep] = useState(1)

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const mutation = useMutation({
    mutationFn: (data: globalThis.FormData) => registerStudent(data),
    onSuccess: () => {
      setSuccess(true)
      toast.success('Registration submitted!')
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.')
    }
  })

  const onSubmit = (data: FormData) => {
    const formData = new globalThis.FormData()
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('dept', data.department)
    formData.append('rollNo', data.rollNo)
    formData.append('dob', data.dob)
    formData.append('addr', data.addr)
    formData.append('govtId', data.govtId[0])
    mutation.mutate(formData)
  }

  const handleNextStep = async () => {
    const isStep1Valid = await trigger(['name', 'email', 'password', 'department', 'rollNo', 'dob', 'addr'])
    if (isStep1Valid) {
      setStep(2)
    }
  }

  return (
    <div style={styles.page}>
      <div className="animate-in" style={styles.backRow}>
        <Link to="/login/student" style={styles.backLink}>
          <ArrowLeft size={14} />
          Back to login
        </Link>
      </div>

      <div className="animate-in" style={styles.card}>
        <div style={styles.cardHeader}>
          <p style={styles.eyebrow}>Student Portal</p>
          <h1 style={styles.title}>Register</h1>
          <p style={styles.subtitle}>Apply for a library account.</p>
        </div>

        {success ? (
          <div style={styles.successState}>
            <CheckCircle size={48} color="var(--color-accent-seafoam)" weight="light" />
            <p style={{ margin: '1rem 0 0', fontWeight: 500, color: 'var(--color-text-primary)' }}>
              Application Submitted
            </p>
            <p style={{ margin: '0.5rem 0 1.5rem', fontSize: '13px', color: 'var(--color-text-secondary)', textAlign: 'center' }}>
              Your application is pending review. You will receive an email with your Library Card Number once approved.
            </p>
            <Link to="/" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Return Home
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} style={styles.form} noValidate>
            
            
            <div style={{ display: step === 1 ? 'flex' : 'none', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={styles.field}>
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className={`input ${errors.name ? 'input-error' : ''}`}
                  {...register('name')}
                />
                {errors.name && <span className="field-error">{errors.name.message}</span>}
              </div>

              <div style={styles.field}>
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className={`input ${errors.email ? 'input-error' : ''}`}
                  {...register('email')}
                />
                {errors.email && <span className="field-error">{errors.email.message}</span>}
              </div>

              <div style={styles.field}>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className={`input ${errors.password ? 'input-error' : ''}`}
                  {...register('password')}
                />
                {errors.password && <span className="field-error">{errors.password.message}</span>}
              </div>

              <div style={styles.field}>
                <label htmlFor="department">Department / Major</label>
                <input
                  id="department"
                  type="text"
                  placeholder="Computer Science"
                  className={`input ${errors.department ? 'input-error' : ''}`}
                  {...register('department')}
                />
                {errors.department && <span className="field-error">{errors.department.message}</span>}
              </div>

              <div style={styles.field}>
                <label htmlFor="rollNo">Roll Number</label>
                <input
                  id="rollNo"
                  type="number"
                  placeholder="101"
                  className={`input ${errors.rollNo ? 'input-error' : ''}`}
                  {...register('rollNo')}
                />
                {errors.rollNo && <span className="field-error">{errors.rollNo.message}</span>}
              </div>

              <div style={styles.field}>
                <label htmlFor="dob">Date of Birth</label>
                <input
                  id="dob"
                  type="date"
                  className={`input ${errors.dob ? 'input-error' : ''}`}
                  {...register('dob')}
                />
                {errors.dob && <span className="field-error">{errors.dob.message}</span>}
              </div>

              <div style={styles.field}>
                <label htmlFor="addr">Address</label>
                <textarea
                  id="addr"
                  placeholder="123 College St"
                  className={`input ${errors.addr ? 'input-error' : ''}`}
                  style={{ minHeight: '60px', resize: 'vertical' }}
                  {...register('addr')}
                />
                {errors.addr && <span className="field-error">{errors.addr.message}</span>}
              </div>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNextStep}
                style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
              >
                Continue →
              </button>
            </div>

            
            <div style={{ display: step === 2 ? 'flex' : 'none', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={styles.field}>
                <label>Government ID (Proof of Identity)</label>
                <div style={styles.fileUpload}>
                  <UploadSimple size={20} color="var(--color-text-muted)" />
                  <input
                    type="file"
                    accept="image/*"
                    {...register('govtId')}
                    style={styles.fileInput}
                  />
                </div>
                {errors.govtId && <span className="field-error">{errors.govtId?.message as string}</span>}
              </div>

              

              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setStep(1)}
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={mutation.isPending}
                  style={{ flex: 2, justifyContent: 'center' }}
                >
                  {mutation.isPending ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </div>

          </form>
        )}
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    backgroundColor: 'var(--color-bg-base)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    position: 'relative',
  },
  backRow: {
    position: 'absolute',
    top: '1.5rem',
    left: '1.5rem',
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    textDecoration: 'none',
    letterSpacing: '0.04em',
    transition: 'color 150ms ease',
  },
  card: {
    width: '100%',
    maxWidth: '480px',
    backgroundColor: 'var(--color-bg-card)',
    border: '2px solid var(--color-border)',
    boxShadow: '4px 4px 0px 0px #111111',
    padding: '2.5rem',
  },
  cardHeader: {
    marginBottom: '2rem',
  },
  eyebrow: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: 'var(--color-accent-lavender)',
    margin: '0 0 0.75rem 0',
  },
  title: {
    fontFamily: 'var(--font-sans)',
    fontSize: '1.75rem',
    fontWeight: 600,
    letterSpacing: '-0.02em',
    color: 'var(--color-text-primary)',
    margin: '0 0 0.5rem 0',
  },
  subtitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    color: 'var(--color-text-secondary)',
    margin: 0,
    lineHeight: 1.6,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
  },
  fileUpload: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px',
    backgroundColor: 'var(--color-bg-surface)',
    border: '1px dashed var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--color-text-primary)',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
  },
  fileInput: {
    width: '100%',
    cursor: 'pointer',
    color: 'var(--color-text-primary)',
    background: 'transparent',
  },
  apiError: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'var(--color-accent-rose-dim)',
    border: '1px solid var(--color-accent-rose)',
    borderRadius: 'var(--radius-sm)',
    padding: '10px 14px',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--color-accent-rose)',
  },
  successState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem 0',
  },
}

```

### frontend\src\features\auth\ResetPasswordPage.tsx
```tsx
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import { resetPassword } from '../../api'
import { CheckCircle } from '@phosphor-icons/react'

const schema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type FormData = z.infer<typeof schema>

export default function ResetPasswordPage() {
  const { token } = useParams<{ token: string }>()
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const mutation = useMutation({
    mutationFn: (data: FormData) => resetPassword(token!, data),
    onSuccess: () => {
      setSuccess(true)
      toast.success('Password updated successfully!')
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to reset password. Link may be invalid or expired.')
    }
  })

  const onSubmit = (data: FormData) => mutation.mutate(data)

  return (
    <div style={styles.page}>
      <div className="animate-in" style={styles.card}>
        <div style={styles.cardHeader}>
          <p style={styles.eyebrow}>Account Recovery</p>
          <h1 style={styles.title}>Reset Password</h1>
          <p style={styles.subtitle}>Enter your new password below.</p>
        </div>

        {success ? (
          <div style={styles.successState}>
            <CheckCircle size={48} color="var(--color-accent-seafoam)" weight="light" />
            <p style={{ margin: '1rem 0 0', fontWeight: 500, color: 'var(--color-text-primary)' }}>
              Password Reset
            </p>
            <p style={{ margin: '0.5rem 0 1.5rem', fontSize: '13px', color: 'var(--color-text-secondary)', textAlign: 'center' }}>
              Your password has been successfully updated.
            </p>
            <Link to="/login/student" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Go to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} style={styles.form} noValidate>
            <div style={styles.field}>
              <label htmlFor="password">New Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className={`input ${errors.password ? 'input-error' : ''}`}
                {...register('password')}
              />
              {errors.password && (
                <span className="field-error">{errors.password.message}</span>
              )}
            </div>

            <div style={styles.field}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className={`input ${errors.confirmPassword ? 'input-error' : ''}`}
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <span className="field-error">{errors.confirmPassword.message}</span>
              )}
            </div>

            

            <button
              type="submit"
              className="btn btn-primary"
              disabled={mutation.isPending}
              style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
            >
              {mutation.isPending ? 'Resetting...' : 'Reset Password →'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    backgroundColor: 'var(--color-bg-base)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    backgroundColor: 'var(--color-bg-card)',
    border: '2px solid var(--color-border)',
    boxShadow: '4px 4px 0px 0px #111111',
    padding: '2.5rem',
  },
  cardHeader: {
    marginBottom: '2rem',
  },
  eyebrow: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: 'var(--color-accent-lavender)',
    margin: '0 0 0.75rem 0',
  },
  title: {
    fontFamily: 'var(--font-sans)',
    fontSize: '1.75rem',
    fontWeight: 600,
    letterSpacing: '-0.02em',
    color: 'var(--color-text-primary)',
    margin: '0 0 0.5rem 0',
  },
  subtitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    color: 'var(--color-text-secondary)',
    margin: 0,
    lineHeight: 1.6,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
  },
  apiError: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'var(--color-accent-rose-dim)',
    border: '1px solid var(--color-accent-rose)',
    borderRadius: 'var(--radius-sm)',
    padding: '10px 14px',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--color-accent-rose)',
  },
  successState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem 0',
  },
}

```

### frontend\src\features\auth\StudentLoginPage.tsx
```tsx
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { studentLogin } from '../../api'
import { ArrowLeft } from '@phosphor-icons/react'

const schema = z.object({
  cardNo: z.string().min(1, 'Card number is required'),
  password: z.string().min(1, 'Password is required'),
})
type FormData = z.infer<typeof schema>

export default function StudentLoginPage() {
  const navigate = useNavigate()
  const { dispatch } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const mutation = useMutation({
    mutationFn: studentLogin,
    onSuccess: (data) => {
      dispatch({
        type: 'LOGIN',
        payload: { ...(data.data.student || data.data), role: 'student' },
      })
      toast.success('Login successful!')
      navigate('/student/dashboard')
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Login failed. Please try again.')
    }
  })

  const onSubmit = (data: FormData) => mutation.mutate(data)

  return (
    <div style={styles.page}>
      
      <div className="animate-in" style={styles.backRow}>
        <Link to="/" style={styles.backLink}>
          <ArrowLeft size={14} />
          Library
        </Link>
      </div>

      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        style={styles.card}
      >
        
        <div style={styles.cardHeader}>
          <p style={styles.eyebrow}>Student Portal</p>
          <h1 style={styles.title}>Sign in</h1>
          <p style={styles.subtitle}>Enter your library card number and password.</p>
        </div>

        
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form} noValidate>
          <div style={styles.field}>
            <label htmlFor="cardNo">Library Card No.</label>
            <input
              id="cardNo"
              type="text"
              placeholder="e.g. 4821"
              className={`input ${errors.cardNo ? 'input-error' : ''}`}
              {...register('cardNo')}
            />
            {errors.cardNo && (
              <span className="field-error">{errors.cardNo.message}</span>
            )}
          </div>

          <div style={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className={`input ${errors.password ? 'input-error' : ''}`}
              {...register('password')}
            />
            {errors.password && (
              <span className="field-error">{errors.password.message}</span>
            )}
          </div>

          

          <button
            type="submit"
            className="btn btn-primary"
            disabled={mutation.isPending}
            style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
          >
            {mutation.isPending ? 'Signing in…' : 'Sign in →'}
          </button>
        </form>

        
        <div style={styles.footerLinks}>
          <Link to="/forgot-password" style={styles.link}>
            Forgot password?
          </Link>
          <span style={{ color: 'var(--color-text-dim)' }}>·</span>
          <Link to="/register" style={styles.link}>
            Register
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    backgroundColor: 'var(--color-bg-base)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    position: 'relative',
  },
  backRow: {
    position: 'absolute',
    top: '1.5rem',
    left: '1.5rem',
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    textDecoration: 'none',
    letterSpacing: '0.04em',
    transition: 'color 150ms ease',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: 'var(--color-bg-card)',
    border: '2px solid var(--color-border)',
    boxShadow: '4px 4px 0px 0px #111111',
    padding: '2.5rem',
  },
  cardHeader: {
    marginBottom: '2rem',
  },
  eyebrow: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: 'var(--color-accent-lavender)',
    margin: '0 0 0.75rem 0',
  },
  title: {
    fontFamily: 'var(--font-sans)',
    fontSize: '1.75rem',
    fontWeight: 600,
    letterSpacing: '-0.02em',
    color: 'var(--color-text-primary)',
    margin: '0 0 0.5rem 0',
  },
  subtitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    color: 'var(--color-text-secondary)',
    margin: 0,
    lineHeight: 1.6,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
  },
  apiError: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'var(--color-accent-rose-dim)',
    border: '1px solid var(--color-accent-rose)',
    borderRadius: 'var(--radius-sm)',
    padding: '10px 14px',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--color-accent-rose)',
  },
  footerLinks: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    marginTop: '1.75rem',
  },
  link: {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    textDecoration: 'none',
    letterSpacing: '0.02em',
    transition: 'color 150ms ease',
  },
}

```

### frontend\src\features\employee\BookRequestsPage.tsx
```tsx
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { getAggregatedRequests, placeOrder, rejectBookRequest } from '../../api'
import { WarningCircle, BookOpen, X, ShoppingCart } from '@phosphor-icons/react'

export default function BookRequestsPage() {
  const queryClient = useQueryClient()
  const [rejectModalOpen, setRejectModalOpen] = useState(false)
  const [orderModalOpen, setOrderModalOpen] = useState(false)
  
  const [selectedGroup, setSelectedGroup] = useState<any>(null)
  
  const [copiesOrdered, setCopiesOrdered] = useState(1)
  

  const { data, isLoading, isError } = useQuery({
    queryKey: ['aggregatedRequests'],
    queryFn: getAggregatedRequests,
  })

  const orderMutation = useMutation({
    mutationFn: placeOrder,
    onSuccess: () => {
      toast.success('Order placed successfully!')
      queryClient.invalidateQueries({ queryKey: ['aggregatedRequests'] })
      setOrderModalOpen(false)
      setCopiesOrdered(1)
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to place order.')
    }
  })

  const rejectMutation = useMutation({
    mutationFn: rejectBookRequest,
    onSuccess: () => {
      toast.success('Requests rejected.')
      queryClient.invalidateQueries({ queryKey: ['aggregatedRequests'] })
      setRejectModalOpen(false)
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to reject requests.')
    }
  })

  const requestGroups = data?.data || []

  const handleOrderClick = (group: any) => {
    setSelectedGroup(group)
    setCopiesOrdered(group.count || 1) // default to number of requests
    setOrderModalOpen(true)
  }

  const handleRejectClick = (group: any) => {
    setSelectedGroup(group)
    setRejectModalOpen(true)
  }

  const submitOrder = () => {
    if (selectedGroup) {
      orderMutation.mutate({
        isbn: selectedGroup._id,
        copiesOrdered,
        requestIds: selectedGroup.requestIds
      })
    }
  }

  const submitReject = () => {
    if (selectedGroup) {
      rejectMutation.mutate({
        requestIds: selectedGroup.requestIds
      })
    }
  }

  if (isLoading) return <div style={styles.center}>Loading book requests...</div>
  if (isError) return <div style={styles.center}><WarningCircle size={32} color="var(--color-accent-rose)" /></div>

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>Book Requests</h1>
        <p style={styles.subtitle}>Aggregated student requests for out-of-stock books.</p>
      </header>

      {requestGroups.length === 0 ? (
        <div style={styles.emptyState}>No pending book requests at the moment.</div>
      ) : (
        <div style={styles.list}>
          {requestGroups.map((group: any) => (
            <div key={group._id} className="card" style={styles.card}>
              <div style={styles.cardHeader}>
                <div style={{...styles.iconBox, backgroundColor: 'rgba(168, 160, 200, 0.1)', color: 'var(--color-accent-lavender)'}}>
                  <BookOpen size={32} />
                </div>
                <div style={styles.info}>
                  <h3 style={styles.name}>{group.bookDetails?.title || 'Unknown Title'}</h3>
                  <p style={styles.subInfo}>ISBN: {group._id} • {group.bookDetails?.author}</p>
                </div>
                <div style={styles.countBadge}>
                  <span style={styles.countNumber}>{group.count}</span>
                  <span style={styles.countLabel}>Requests</span>
                </div>
              </div>
              
              <div style={styles.actions}>
                <button 
                  className="btn btn-secondary" 
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => handleRejectClick(group)}
                >
                  <X size={16} /> Reject All
                </button>
                <button 
                  className="btn btn-primary" 
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => handleOrderClick(group)}
                >
                  <ShoppingCart size={16} /> Place Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      
      {rejectModalOpen && (
        <div className="modal-overlay" onClick={() => setRejectModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>Reject Requests</h3>
            <p style={styles.modalDesc}>Are you sure you want to dismiss {selectedGroup?.count} requests for this book?</p>
            <div style={styles.modalActions}>
              <button className="btn btn-secondary" onClick={() => setRejectModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={submitReject} disabled={rejectMutation.isPending} style={{ backgroundColor: 'var(--color-accent-rose)', borderColor: 'var(--color-accent-rose)' }}>
                {rejectMutation.isPending ? 'Rejecting...' : 'Yes, Reject'}
              </button>
            </div>
          </div>
        </div>
      )}

      
      {orderModalOpen && (
        <div className="modal-overlay" onClick={() => setOrderModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>Place Order</h3>
            <p style={styles.modalDesc}>How many copies of <strong>{selectedGroup?.bookDetails?.title || selectedGroup?._id}</strong> would you like to order from the publisher?</p>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Copies</label>
              <input 
                className="input"
                type="number" 
                min={1}
                value={copiesOrdered}
                onChange={e => setCopiesOrdered(parseInt(e.target.value) || 1)}
              />
            </div>
            <div style={styles.modalActions}>
              <button className="btn btn-secondary" onClick={() => setOrderModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={submitOrder} disabled={orderMutation.isPending || copiesOrdered < 1}>
                {orderMutation.isPending ? 'Ordering...' : 'Confirm Order'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  center: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-text-muted)',
    fontFamily: 'var(--font-mono)',
  },
  header: {
    marginBottom: '2rem',
  },
  title: {
    fontFamily: 'var(--font-sans)',
    fontSize: '24px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    margin: '0 0 0.5rem 0',
  },
  subtitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    color: 'var(--color-text-secondary)',
    margin: 0,
  },
  emptyState: {
    fontFamily: 'var(--font-mono)',
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    padding: '3rem',
    textAlign: 'center',
    backgroundColor: 'var(--color-bg-surface)',
    borderRadius: 'var(--radius-md)',
    border: '1px dashed var(--color-border)',
  },
  list: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    backgroundColor: 'var(--color-bg-card)',
    border: '2px solid var(--color-border)',
    boxShadow: '4px 4px 0px 0px #111111',
    display: 'flex',
    flexDirection: 'column',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.5rem',
    borderBottom: '1px solid var(--color-border)',
  },
  iconBox: {
    width: '48px',
    height: '48px',
    borderRadius: 'var(--radius-sm)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    overflow: 'hidden',
    flex: 1,
  },
  name: {
    fontFamily: 'var(--font-sans)',
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    margin: 0,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  subInfo: {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--color-text-secondary)',
    margin: 0,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  countBadge: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--color-bg-base)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    padding: '0.5rem',
    minWidth: '60px',
  },
  countNumber: {
    fontFamily: 'var(--font-sans)',
    fontSize: '18px',
    fontWeight: 700,
    color: 'var(--color-text-primary)',
    lineHeight: 1,
  },
  countLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: '10px',
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase',
    marginTop: '4px',
  },
  actions: {
    display: 'flex',
    gap: '0.75rem',
    padding: '1.5rem',
  },
  modalTitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '18px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    margin: '0 0 0.5rem 0',
  },
  modalDesc: {
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    color: 'var(--color-text-secondary)',
    margin: '0 0 1.5rem 0',
    lineHeight: 1.4,
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.75rem',
  }
}

```

### frontend\src\features\employee\EmployeeCataloguePage.tsx
```tsx
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { searchBooks, getCategories, manualOrder } from '../../api'
import { MagnifyingGlass, BookOpen, WarningCircle, ShoppingCart } from '@phosphor-icons/react'

export default function EmployeeCataloguePage() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  
  const [orderModalOpen, setOrderModalOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState<any>(null)
  const [copiesOrdered, setCopiesOrdered] = useState(1)

  const [extModalOpen, setExtModalOpen] = useState(false)
  const [extIsbn, setExtIsbn] = useState('')
  const [extCopies, setExtCopies] = useState(1)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['books', search, category],
    queryFn: () => searchBooks({ search, category }),
  })

  const { data: catData } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  const orderMutation = useMutation({
    mutationFn: manualOrder,
    onSuccess: () => {
      toast.success('Order placed successfully!')
      queryClient.invalidateQueries({ queryKey: ['books'] })
      setOrderModalOpen(false)
      setCopiesOrdered(1)
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to place order.')
    }
  })

  const books = data?.data || []
  const categoriesList = ['', ...(catData?.data?.filter((c: string) => c) || [])]

  const handleOrderClick = (book: any) => {
    setSelectedBook(book)
    setCopiesOrdered(1)
    setOrderModalOpen(true)
  }

  const submitOrder = () => {
    if (selectedBook && copiesOrdered > 0) {
      orderMutation.mutate({
        isbn: selectedBook.globalBookId,
        copiesOrdered
      })
    }
  }

  const submitExtOrder = () => {
    if (extIsbn && extCopies > 0) {
      orderMutation.mutate({
        isbn: extIsbn,
        copiesOrdered: extCopies
      })
      setExtModalOpen(false)
      setExtIsbn('')
      setExtCopies(1)
    }
  }

  return (
    <div style={styles.page}>
      
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.headerTitle}>Library Catalogue</h1>
        </div>
      </header>

      
      <main className="flex flex-col flex-1 w-full py-8 gap-8 items-start pb-24 pl-8 pr-24">
        
        {/* Horizontal Filters Bar */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[var(--color-border)] pb-6">
          <div className="flex flex-row overflow-x-auto gap-2 w-full md:w-auto flex-1 items-center pb-2 md:pb-0">
            <button 
              className="btn btn-primary flex-shrink-0 mr-4"
              onClick={() => setExtModalOpen(true)}
            >
              + Order External Book
            </button>
            <span style={{...styles.filterTitle, marginBottom: 0, marginRight: '0.5rem'}}>Categories:</span>
            {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  ...styles.filterBtn,
                  padding: '6px 16px',
                  borderRadius: '999px',
                  backgroundColor: category === cat ? 'var(--color-text-primary)' : 'transparent',
                  color: category === cat ? 'var(--color-bg-base)' : 'var(--color-text-secondary)',
                  fontWeight: category === cat ? 600 : 400,
                  whiteSpace: 'nowrap',
                  border: category === cat ? '1px solid var(--color-text-primary)' : '1px solid var(--color-border)'
                }}
              >
                {cat === '' ? 'All' : cat}
              </button>
            ))}
          </div>

          <div style={{ ...styles.searchBox, marginBottom: 0 }} className="w-full md:w-[300px] flex-shrink-0">
            <MagnifyingGlass size={16} color="var(--color-text-muted)" style={{ position: 'absolute', left: 12, top: 10 }} />
            <input
              type="text"
              placeholder="Search title or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
            />
          </div>
        </div>

        <section style={styles.content} className="w-full">
          {isLoading ? (
            <div style={styles.stateCenter}>Loading...</div>
          ) : isError || books.length === 0 ? (
            <div style={styles.stateCenter}>
              <WarningCircle size={32} color="var(--color-text-muted)" weight="light" style={{ marginBottom: '1rem' }} />
              <p style={{ color: 'var(--color-text-secondary)' }}>No books found.</p>
            </div>
          ) : (
            <div className="w-full" style={styles.grid}>
              {books.map((book: any) => (
                <div key={book._id} className="card" style={styles.bookCard}>
                  {book.coverImg ? (
                    <img src={book.coverImg} alt={book.title} style={styles.bookCover} />
                  ) : (
                    <div style={styles.bookCoverPlaceholder}>
                      <BookOpen size={32} color="var(--color-text-muted)" weight="light" />
                    </div>
                  )}
                  <div style={styles.bookInfo}>
                    <h3 style={styles.bookTitle}>{book.title}</h3>
                    <p style={styles.bookAuthors}>{book.authors?.join(', ')}</p>
                    
                    <div style={styles.bookMeta}>
                      {book.category?.map((cat: string) => (
                        <span key={cat} className="badge badge-muted">{cat}</span>
                      ))}
                    </div>

                    <div style={styles.bookFooter}>
                      <div style={styles.statusGroup}>
                        {book.avl > 0 ? (
                          <span className="badge badge-seafoam">Available</span>
                        ) : (
                          <span className="badge badge-rose">Out of Stock</span>
                        )}
                        <span style={styles.copiesText}>{book.avl} / {book.total} copies</span>
                      </div>
                      <button 
                        className="btn btn-secondary" 
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                        onClick={() => handleOrderClick(book)}
                      >
                        <ShoppingCart size={14} /> Order
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      
      {extModalOpen && (
        <div className="modal-overlay" onClick={() => setExtModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>Order External Book</h3>
            <p style={styles.modalDesc}>Enter the ISBN (e.g., Google Books ID) to procure a new book.</p>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>ISBN / Book ID</label>
              <input 
                className="input"
                type="text" 
                value={extIsbn}
                onChange={e => setExtIsbn(e.target.value)}
                placeholder="e.g., 9780132350884"
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Copies</label>
              <input 
                className="input"
                type="number" 
                min={1}
                value={extCopies}
                onChange={e => setExtCopies(parseInt(e.target.value) || 1)}
              />
            </div>
            <div style={styles.modalActions}>
              <button className="btn btn-secondary" onClick={() => setExtModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={submitExtOrder} disabled={orderMutation.isPending || extCopies < 1 || !extIsbn}>
                {orderMutation.isPending ? 'Ordering...' : 'Confirm Order'}
              </button>
            </div>
          </div>
        </div>
      )}

      {orderModalOpen && (
        <div className="modal-overlay" onClick={() => setOrderModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>Order Book</h3>
            <p style={styles.modalDesc}>How many copies of <strong>{selectedBook?.title}</strong> would you like to order from the publisher?</p>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Copies</label>
              <input 
                className="input"
                type="number" 
                min={1}
                value={copiesOrdered}
                onChange={e => setCopiesOrdered(parseInt(e.target.value) || 1)}
              />
            </div>
            <div style={styles.modalActions}>
              <button className="btn btn-secondary" onClick={() => setOrderModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={submitOrder} disabled={orderMutation.isPending || copiesOrdered < 1}>
                {orderMutation.isPending ? 'Ordering...' : 'Confirm Order'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    backgroundColor: 'var(--color-bg-base)',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    height: '80px',
    borderBottom: '2px solid var(--color-border)',
    display: 'flex',
    alignItems: 'center',
    padding: '0 2rem',
    backgroundColor: 'var(--color-bg-base)',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  headerTitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '18px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    margin: 0,
  },
  main: {
    display: 'flex',
    flex: 1,
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    padding: '2rem',
    gap: '3rem',
    alignItems: 'flex-start',
  },
  sidebar: {
    width: '240px',
    position: 'sticky',
    top: 'calc(64px + 2rem)',
  },
  searchBox: {
    position: 'relative',
    marginBottom: '2rem',
  },
  searchInput: {
    width: '100%',
    backgroundColor: 'var(--color-bg-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--color-text-primary)',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    padding: '10px 14px 10px 36px',
    outline: 'none',
    transition: 'border-color 150ms ease',
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  filterTitle: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--color-text-muted)',
    marginBottom: '0.5rem',
  },
  filterBtn: {
    background: 'none',
    border: 'none',
    textAlign: 'left',
    padding: '6px 0',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'color 150ms ease',
  },
  content: {
    flex: 1,
  },
  stateCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4rem 0',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '1.5rem',
  },
  bookCard: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0',
    overflow: 'hidden',
    height: '100%',
  },
  bookCover: {
    width: '100%',
    height: '160px',
    objectFit: 'cover',
    borderBottom: '1px solid var(--color-border)',
  },
  bookCoverPlaceholder: {
    width: '100%',
    height: '160px',
    backgroundColor: 'var(--color-bg-surface)',
    borderBottom: '1px solid var(--color-border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookInfo: {
    padding: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  bookTitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    margin: '0 0 0.25rem 0',
    lineHeight: 1.4,
  },
  bookAuthors: {
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    color: 'var(--color-text-secondary)',
    margin: '0 0 1rem 0',
  },
  bookMeta: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '1.5rem',
  },
  bookFooter: {
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid var(--color-border)',
  },
  statusGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  copiesText: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    color: 'var(--color-text-muted)',
  },
  modalTitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '18px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    margin: '0 0 0.5rem 0',
  },
  modalDesc: {
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    color: 'var(--color-text-secondary)',
    margin: '0 0 1.5rem 0',
    lineHeight: 1.4,
  },
  /* Removed unused input styles */
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.75rem',
  }
}

```

### frontend\src\features\employee\EmployeeDashboard.tsx
```tsx
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { borrowBook, returnBook } from '../../api'
import { BookBookmark, ArrowUUpLeft } from '@phosphor-icons/react'

export default function EmployeeDashboard() {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>Front Desk</h1>
        <p style={styles.subtitle}>Issue and return books for students.</p>
      </header>

      <div style={styles.grid}>
        <IssueDesk />
        <ReturnDesk />
      </div>
    </div>
  )
}

function IssueDesk() {
  const [form, setForm] = useState({ cardNo: '', isbn: '' })
  const mutation = useMutation({
    mutationFn: borrowBook,
    onSuccess: () => {
      toast.success('Book issued successfully!')
      setForm({ cardNo: '', isbn: '' })
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to issue book.')
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.cardNo || !form.isbn) return toast.error('Please fill all fields.')
    mutation.mutate(form)
  }

  return (
    <div className="card" style={styles.card}>
      <div style={styles.cardHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ ...styles.iconBox, backgroundColor: 'rgba(168, 160, 200, 0.1)', color: 'var(--color-accent-lavender)' }}>
            <BookBookmark size={24} />
          </div>
          <h2 style={styles.cardTitle}>Issue Book</h2>
        </div>
      </div>
      <div style={styles.cardBody}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label>Student Card No</label>
            <input 
              className="input"
              type="text" 
              placeholder="e.g. LIB-STU-123"
              value={form.cardNo} 
              onChange={e => setForm({...form, cardNo: e.target.value})} 
            />
          </div>
          <div style={styles.field}>
            <label>Book ISBN</label>
            <input 
              className="input"
              type="text" 
              placeholder="e.g. 9781234567897"
              value={form.isbn} 
              onChange={e => setForm({...form, isbn: e.target.value})} 
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '0.5rem', justifyContent: 'center' }}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Issuing...' : 'Issue Book'}
          </button>
        </form>
      </div>
    </div>
  )
}

function ReturnDesk() {
  const [form, setForm] = useState({ cardNo: '', isbn: '' })
  const mutation = useMutation({
    mutationFn: returnBook,
    onSuccess: () => {
      toast.success('Book returned successfully!')
      setForm({ cardNo: '', isbn: '' })
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to return book.')
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.cardNo || !form.isbn) return toast.error('Please fill all fields.')
    mutation.mutate(form)
  }

  return (
    <div className="card" style={styles.card}>
      <div style={styles.cardHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ ...styles.iconBox, backgroundColor: 'rgba(143, 191, 176, 0.1)', color: 'var(--color-accent-seafoam)' }}>
            <ArrowUUpLeft size={24} />
          </div>
          <h2 style={styles.cardTitle}>Return Book</h2>
        </div>
      </div>
      <div style={styles.cardBody}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label>Student Card No</label>
            <input 
              className="input"
              type="text" 
              placeholder="e.g. LIB-STU-123"
              value={form.cardNo} 
              onChange={e => setForm({...form, cardNo: e.target.value})} 
            />
          </div>
          <div style={styles.field}>
            <label>Book ISBN</label>
            <input 
              className="input"
              type="text" 
              placeholder="e.g. 9781234567897"
              value={form.isbn} 
              onChange={e => setForm({...form, isbn: e.target.value})} 
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '0.5rem', justifyContent: 'center', backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Processing...' : 'Process Return'}
          </button>
        </form>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: '2rem',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  header: {
    marginBottom: '2rem',
  },
  title: {
    fontFamily: 'var(--font-sans)',
    fontSize: '24px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    margin: '0 0 0.5rem 0',
  },
  subtitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    color: 'var(--color-text-secondary)',
    margin: 0,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  card: {
    padding: '1.5rem',
  },
  cardHeader: {
    borderBottom: '1px solid var(--color-border)',
    paddingBottom: '1rem',
    marginBottom: '1.5rem',
  },
  cardTitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '18px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    margin: 0,
  },
  cardBody: {
    display: 'flex',
    flexDirection: 'column',
  },
  iconBox: {
    width: '40px',
    height: '40px',
    borderRadius: 'var(--radius-sm)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  errorAlert: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem',
    backgroundColor: 'rgba(212, 160, 160, 0.1)',
    border: '1px solid var(--color-accent-rose)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--color-accent-rose)',
    fontSize: '13px',
    fontFamily: 'var(--font-sans)',
  },
  successAlert: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem',
    backgroundColor: 'rgba(143, 191, 176, 0.1)',
    border: '1px solid var(--color-accent-seafoam)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--color-accent-seafoam)',
    fontSize: '13px',
    fontFamily: 'var(--font-sans)',
  },
}

```

### frontend\src\features\employee\OrdersPage.tsx
```tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { getAllOrders, receiveOrder } from '../../api'
import { WarningCircle, Package, Check, Truck } from '@phosphor-icons/react'

export default function OrdersPage() {
  const queryClient = useQueryClient()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['orders'],
    queryFn: getAllOrders,
  })

  const receiveMutation = useMutation({
    mutationFn: receiveOrder,
    onSuccess: () => {
      toast.success('Order marked as received!')
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to receive order.')
    }
  })

  const orders = data?.data || []

  const handleReceive = (id: string) => {
    receiveMutation.mutate(id)
  }

  if (isLoading) return <div style={styles.center}>Loading orders...</div>
  if (isError) return <div style={styles.center}><WarningCircle size={32} color="var(--color-accent-rose)" /><p>{(error as any)?.response?.data?.message || (error as Error)?.message}</p></div>

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>Book Orders</h1>
        <p style={styles.subtitle}>Track and receive publisher orders.</p>
      </header>

      {orders.length === 0 ? (
        <div style={styles.emptyState}>No book orders found.</div>
      ) : (
        <div style={styles.timeline}>
          {orders.map((order: any) => {
            const isReceived = order.status === 'Received'
            
            return (
              <div key={order._id} className="card" style={{ ...styles.card, opacity: isReceived ? 0.6 : 1 }}>
                <div style={styles.cardHeader}>
                  <div style={{...styles.iconBox, backgroundColor: isReceived ? 'var(--color-bg-surface)' : 'rgba(196, 168, 90, 0.1)', color: isReceived ? 'var(--color-text-muted)' : 'var(--color-accent-amber)'}}>
                    {isReceived ? <Package size={24} /> : <Truck size={24} />}
                  </div>
                  <div style={styles.info}>
                    <h3 style={styles.name}>{order.orderTitle || 'Unknown Title'}</h3>
                    <p style={styles.subInfo}>ISBN: {order.globalBookId} • {order.copiesOrdered} copies ordered</p>
                  </div>
                  <div style={styles.statusBox}>
                    <span className={`badge ${isReceived ? 'badge-muted' : 'badge-amber'}`}>
                      {order.status}
                    </span>
                    <span style={styles.dateText}>
                      {new Date(order.orderDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {!isReceived && (
                  <div style={styles.actions}>
                    <button 
                      className="btn btn-primary" 
                      style={{ padding: '6px 12px', fontSize: '13px', marginLeft: 'auto' }}
                      onClick={() => handleReceive(order._id)}
                      disabled={receiveMutation.isPending && receiveMutation.variables === order._id}
                    >
                      {(receiveMutation.isPending && receiveMutation.variables === order._id) ? 'Receiving...' : <><Check size={16} /> Mark as Received</>}
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: '2rem',
    maxWidth: '900px',
    margin: '0 auto',
  },
  center: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-text-muted)',
    fontFamily: 'var(--font-mono)',
  },
  header: {
    marginBottom: '2rem',
  },
  title: {
    fontFamily: 'var(--font-sans)',
    fontSize: '24px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    margin: '0 0 0.5rem 0',
  },
  subtitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    color: 'var(--color-text-secondary)',
    margin: 0,
  },
  emptyState: {
    fontFamily: 'var(--font-mono)',
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    padding: '3rem',
    textAlign: 'center',
    backgroundColor: 'var(--color-bg-surface)',
    borderRadius: 'var(--radius-md)',
    border: '1px dashed var(--color-border)',
  },
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  card: {
    backgroundColor: 'var(--color-bg-card)',
    border: '2px solid var(--color-border)',
    boxShadow: '4px 4px 0px 0px #111111',
    display: 'flex',
    flexDirection: 'column',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.25rem',
  },
  iconBox: {
    width: '40px',
    height: '40px',
    borderRadius: 'var(--radius-sm)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    overflow: 'hidden',
    flex: 1,
  },
  name: {
    fontFamily: 'var(--font-sans)',
    fontSize: '15px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    margin: 0,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  subInfo: {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--color-text-secondary)',
    margin: 0,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  statusBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '6px',
  },
  dateText: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    color: 'var(--color-text-muted)',
  },
  actions: {
    display: 'flex',
    padding: '1rem 1.25rem',
    borderTop: '1px dashed var(--color-border)',
    backgroundColor: 'var(--color-bg-base)',
  },
}

```

### frontend\src\features\employee\PendingEditsPage.tsx
```tsx
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { getPendingEdits, approveEdit, rejectEdit } from '../../api'
import { WarningCircle, UserCircle, X, Check, ArrowRight } from '@phosphor-icons/react'

export default function PendingEditsPage() {
  const queryClient = useQueryClient()
  const [rejectModalOpen, setRejectModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
  const [rejectReason, setRejectReason] = useState('')

  const { data, isLoading, isError } = useQuery({
    queryKey: ['pendingEdits'],
    queryFn: getPendingEdits,
  })

  const approveMutation = useMutation({
    mutationFn: approveEdit,
    onSuccess: () => {
      toast.success('Edits approved successfully!')
      queryClient.invalidateQueries({ queryKey: ['pendingEdits'] })
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to approve edits.')
    }
  })

  const rejectMutation = useMutation({
    mutationFn: rejectEdit,
    onSuccess: () => {
      toast.success('Edits rejected.')
      queryClient.invalidateQueries({ queryKey: ['pendingEdits'] })
      setRejectModalOpen(false)
      setRejectReason('')
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to reject edits.')
    }
  })

  const students = data?.data || []

  const handleApprove = (id: string) => {
    approveMutation.mutate({ studentId: id })
  }

  const handleRejectClick = (id: string) => {
    setSelectedStudent(id)
    setRejectModalOpen(true)
  }

  const submitReject = () => {
    if (selectedStudent && rejectReason.trim()) {
      rejectMutation.mutate({ studentId: selectedStudent, reason: rejectReason })
    }
  }

  if (isLoading) return <div style={styles.center}>Loading pending edits...</div>
  if (isError) return <div style={styles.center}><WarningCircle size={32} color="var(--color-accent-rose)" /></div>

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>Pending Profile Edits</h1>
        <p style={styles.subtitle}>Review requested changes to student profiles.</p>
      </header>

      {students.length === 0 ? (
        <div style={styles.emptyState}>No pending profile edits at the moment.</div>
      ) : (
        <div style={styles.list}>
          {students.map((student: any) => {
            const edits = student.pendingEdits
            const changes = [
              { field: 'Name', old: student.name, new: edits.name },
              { field: 'Email', old: student.email, new: edits.email },
              { field: 'Address', old: student.addr, new: edits.addr },
            ].filter(c => c.old !== c.new)

            return (
              <div key={student._id} className="card" style={styles.card}>
                <div style={styles.cardHeader}>
                  <div style={styles.avatar}>
                    <UserCircle size={40} color="var(--color-text-muted)" weight="light" />
                  </div>
                  <div style={styles.info}>
                    <h3 style={styles.name}>{student.name}</h3>
                    <p style={styles.subInfo}>{student.rollNo} • {student.cardNo}</p>
                  </div>
                </div>
                
                <div style={styles.cardBody}>
                  <h4 style={styles.diffTitle}>Requested Changes:</h4>
                  <div style={styles.diffList}>
                    {changes.map((change, i) => (
                      <div key={i} style={styles.diffRow}>
                        <span style={styles.diffField}>{change.field}</span>
                        <div style={styles.diffValues}>
                          <span style={styles.oldValue}>{change.old || '(empty)'}</span>
                          <ArrowRight size={14} color="var(--color-text-muted)" />
                          <span style={styles.newValue}>{change.new || '(empty)'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={styles.actions}>
                  <button 
                    className="btn btn-secondary" 
                    style={{ flex: 1, justifyContent: 'center' }}
                    onClick={() => handleRejectClick(student._id)}
                    disabled={approveMutation.isPending && approveMutation.variables?.studentId === student._id}
                  >
                    <X size={16} /> Reject
                  </button>
                  <button 
                    className="btn btn-primary" 
                    style={{ flex: 1, justifyContent: 'center' }}
                    onClick={() => handleApprove(student._id)}
                    disabled={approveMutation.isPending && approveMutation.variables?.studentId === student._id}
                  >
                    {(approveMutation.isPending && approveMutation.variables?.studentId === student._id) ? 'Approving...' : <><Check size={16} /> Approve</>}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      
      {rejectModalOpen && (
        <div className="modal-overlay" onClick={() => setRejectModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>Reject Edits</h3>
            <p style={styles.modalDesc}>Please provide a reason for rejecting these edits.</p>
            <textarea 
              className="input"
              style={{ minHeight: '100px', resize: 'vertical', width: '100%', marginBottom: '1rem' }}
              placeholder="Reason for rejection..."
              value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
            />
            <div style={styles.modalActions}>
              <button className="btn btn-secondary" onClick={() => setRejectModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={submitReject} disabled={!rejectReason.trim() || rejectMutation.isPending} style={{ backgroundColor: 'var(--color-accent-rose)', borderColor: 'var(--color-accent-rose)' }}>
                {rejectMutation.isPending ? 'Rejecting...' : 'Confirm Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  center: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-text-muted)',
    fontFamily: 'var(--font-mono)',
  },
  header: {
    marginBottom: '2rem',
  },
  title: {
    fontFamily: 'var(--font-sans)',
    fontSize: '24px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    margin: '0 0 0.5rem 0',
  },
  subtitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    color: 'var(--color-text-secondary)',
    margin: 0,
  },
  emptyState: {
    fontFamily: 'var(--font-mono)',
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    padding: '3rem',
    textAlign: 'center',
    backgroundColor: 'var(--color-bg-surface)',
    borderRadius: 'var(--radius-md)',
    border: '1px dashed var(--color-border)',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  card: {
    backgroundColor: 'var(--color-bg-card)',
    border: '2px solid var(--color-border)',
    boxShadow: '4px 4px 0px 0px #111111',
    display: 'flex',
    flexDirection: 'column',
  },
  cardHeader: {
    display: 'flex',
    gap: '1rem',
    padding: '1.5rem',
    borderBottom: '1px solid var(--color-border)',
  },
  avatar: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    overflow: 'hidden',
  },
  name: {
    fontFamily: 'var(--font-sans)',
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    margin: 0,
  },
  subInfo: {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--color-text-secondary)',
    margin: 0,
  },
  cardBody: {
    padding: '1.5rem',
  },
  diffTitle: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    textTransform: 'uppercase',
    color: 'var(--color-text-muted)',
    margin: '0 0 1rem 0',
    letterSpacing: '0.05em',
  },
  diffList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  diffRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.75rem',
    backgroundColor: 'var(--color-bg-base)',
    borderRadius: '4px',
    border: '1px solid var(--color-border)',
  },
  diffField: {
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--color-text-primary)',
    width: '100px',
  },
  diffValues: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flex: 1,
  },
  oldValue: {
    fontFamily: 'var(--font-mono)',
    fontSize: '13px',
    color: 'var(--color-text-secondary)',
    textDecoration: 'line-through',
    flex: 1,
    textAlign: 'right',
  },
  newValue: {
    fontFamily: 'var(--font-mono)',
    fontSize: '13px',
    color: 'var(--color-accent-seafoam)',
    flex: 1,
  },
  actions: {
    display: 'flex',
    gap: '0.75rem',
    padding: '1.5rem',
    borderTop: '1px solid var(--color-border)',
  },
  modalTitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '18px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    margin: '0 0 0.5rem 0',
  },
  modalDesc: {
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    color: 'var(--color-text-secondary)',
    margin: '0 0 1rem 0',
    lineHeight: 1.4,
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.75rem',
  }
}

```

### frontend\src\features\employee\PendingStudentsPage.tsx
```tsx
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { getPendingStudents, approveStudent, rejectStudent } from '../../api'
import { WarningCircle, UserCircle, IdentificationCard, X, Check } from '@phosphor-icons/react'

export default function PendingStudentsPage() {
  const queryClient = useQueryClient()
  const [rejectModalOpen, setRejectModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
  const [rejectReason, setRejectReason] = useState('')

  const { data, isLoading, isError } = useQuery({
    queryKey: ['pendingStudents'],
    queryFn: getPendingStudents,
  })

  const approveMutation = useMutation({
    mutationFn: approveStudent,
    onSuccess: () => {
      toast.success('Student approved successfully!')
      queryClient.invalidateQueries({ queryKey: ['pendingStudents'] })
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to approve student.')
    }
  })

  const rejectMutation = useMutation({
    mutationFn: rejectStudent,
    onSuccess: () => {
      toast.success('Student rejected.')
      queryClient.invalidateQueries({ queryKey: ['pendingStudents'] })
      setRejectModalOpen(false)
      setRejectReason('')
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to reject student.')
    }
  })

  const students = data?.data || []

  const handleApprove = (id: string) => {
    approveMutation.mutate({ studentId: id })
  }

  const handleRejectClick = (id: string) => {
    setSelectedStudent(id)
    setRejectModalOpen(true)
  }

  const submitReject = () => {
    if (selectedStudent && rejectReason.trim()) {
      rejectMutation.mutate({ studentId: selectedStudent, reason: rejectReason })
    }
  }

  if (isLoading) return <div style={styles.center}>Loading pending students...</div>
  if (isError) return <div style={styles.center}><WarningCircle size={32} color="var(--color-accent-rose)" /></div>

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>Pending Approvals</h1>
        <p style={styles.subtitle}>Review new student registrations.</p>
      </header>

      {students.length === 0 ? (
        <div style={styles.emptyState}>No pending students at the moment.</div>
      ) : (
        <div style={styles.grid}>
          {students.map((student: any) => (
            <div key={student._id} className="card" style={styles.card}>
              <div style={styles.cardHeader}>
                <div style={styles.avatar}>
                  <UserCircle size={40} color="var(--color-text-muted)" weight="light" />
                </div>
                <div style={styles.info}>
                  <h3 style={styles.name}>{student.name}</h3>
                  <p style={styles.subInfo}>{student.rollNo} • {student.dept}</p>
                  <p style={styles.subInfo}>{student.email}</p>
                </div>
              </div>
              
              <div style={styles.cardBody}>
                <a href={student.govtId} target="_blank" rel="noreferrer" style={styles.idLink}>
                  <IdentificationCard size={18} /> View Govt ID
                </a>
              </div>

              <div style={styles.actions}>
                <button 
                  className="btn btn-secondary" 
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => handleRejectClick(student._id)}
                  disabled={approveMutation.isPending && approveMutation.variables?.studentId === student._id}
                >
                  <X size={16} /> Reject
                </button>
                <button 
                  className="btn btn-primary" 
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => handleApprove(student._id)}
                  disabled={approveMutation.isPending && approveMutation.variables?.studentId === student._id}
                >
                  {(approveMutation.isPending && approveMutation.variables?.studentId === student._id) ? 'Approving...' : <><Check size={16} /> Approve</>}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      
      {rejectModalOpen && <div className="modal-overlay" onClick={() => setRejectModalOpen(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <h3 style={styles.modalTitle}>Reject Application</h3>
              <p style={styles.modalText}>Please provide a reason for rejecting this application. This will be emailed to the student.</p>
              <textarea 
                className="input"
                style={{ minHeight: '100px', resize: 'vertical' }}
                placeholder="Reason for rejection..."
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
              />
            <div style={styles.modalActions}>
              <button className="btn btn-secondary" onClick={() => setRejectModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={submitReject} disabled={!rejectReason.trim() || rejectMutation.isPending} style={{ backgroundColor: 'var(--color-accent-rose)', borderColor: 'var(--color-accent-rose)' }}>
                {rejectMutation.isPending ? 'Rejecting...' : 'Confirm Reject'}
              </button>
            </div>
            </div>
          </div>
      }
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  center: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-text-muted)',
    fontFamily: 'var(--font-mono)',
  },
  header: {
    marginBottom: '2rem',
  },
  title: {
    fontFamily: 'var(--font-sans)',
    fontSize: '24px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    margin: '0 0 0.5rem 0',
  },
  subtitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    color: 'var(--color-text-secondary)',
    margin: 0,
  },
  emptyState: {
    fontFamily: 'var(--font-mono)',
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    padding: '3rem',
    textAlign: 'center',
    backgroundColor: 'var(--color-bg-surface)',
    borderRadius: 'var(--radius-md)',
    border: '1px dashed var(--color-border)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    backgroundColor: 'var(--color-bg-card)',
    border: '2px solid var(--color-border)',
    boxShadow: '4px 4px 0px 0px #111111',
    display: 'flex',
    flexDirection: 'column',
  },
  cardHeader: {
    display: 'flex',
    gap: '1rem',
    padding: '1.5rem',
    borderBottom: '1px solid var(--color-border)',
  },
  avatar: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    overflow: 'hidden',
  },
  name: {
    fontFamily: 'var(--font-sans)',
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    margin: 0,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  subInfo: {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--color-text-secondary)',
    margin: 0,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  cardBody: {
    padding: '1.5rem',
    flex: 1,
  },
  idLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'var(--color-accent-lavender)',
    textDecoration: 'none',
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    fontWeight: 500,
    padding: '8px 12px',
    backgroundColor: 'rgba(168, 160, 200, 0.1)',
    borderRadius: '4px',
    transition: 'background-color 200ms ease',
  },
  actions: {
    display: 'flex',
    gap: '0.75rem',
    padding: '1.5rem',
    borderTop: '1px solid var(--color-border)',
  },
  modalTitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '18px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    margin: '0 0 0.5rem 0',
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.75rem',
  }
}

```

### frontend\src\features\public\CataloguePage.tsx
```tsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { searchBooks, getCategories } from '../../api'
import { ArrowLeft, MagnifyingGlass, BookOpen, WarningCircle } from '@phosphor-icons/react'

export default function CataloguePage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')

  const { data, isLoading, isError } = useQuery({
    queryKey: ['books', search, category],
    queryFn: () => searchBooks({ search, category }),
  })

  const { data: catData } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  const books = data?.data || []
  const categoriesList = ['', ...(catData?.data?.filter((c: string) => c) || [])]

  return (
    <div style={styles.page}>
      
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <Link to="/" style={styles.backLink}>
            <ArrowLeft size={14} />
            Library
          </Link>
          <span style={styles.headerDivider}>/</span>
          <span style={styles.headerTitle}>Catalogue</span>
        </div>
      </header>

      
      <main className="flex flex-col flex-1 w-full py-8 gap-8 items-start pb-24 pl-8 pr-24">
        
        {/* Horizontal Filters Bar */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[var(--color-border)] pb-6">
          <div className="flex flex-row overflow-x-auto gap-2 w-full md:w-auto flex-1 items-center pb-2 md:pb-0">
            <span style={{...styles.filterTitle, marginBottom: 0, marginRight: '0.5rem'}}>Categories:</span>
            {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  ...styles.filterBtn,
                  padding: '6px 16px',
                  borderRadius: '999px',
                  backgroundColor: category === cat ? 'var(--color-text-primary)' : 'transparent',
                  color: category === cat ? 'var(--color-bg-base)' : 'var(--color-text-secondary)',
                  fontWeight: category === cat ? 600 : 400,
                  whiteSpace: 'nowrap',
                  border: category === cat ? '1px solid var(--color-text-primary)' : '1px solid var(--color-border)'
                }}
              >
                {cat === '' ? 'All' : cat}
              </button>
            ))}
          </div>

          <div style={{ ...styles.searchBox, marginBottom: 0 }} className="w-full md:w-[300px] flex-shrink-0">
            <MagnifyingGlass size={16} color="var(--color-text-muted)" style={{ position: 'absolute', left: 12, top: 10 }} />
            <input
              type="text"
              placeholder="Search title or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
            />
          </div>
        </div>

        <section style={styles.content} className="w-full">
          {isLoading ? (
            <div style={styles.stateCenter}>Loading...</div>
          ) : isError || books.length === 0 ? (
            <div style={styles.stateCenter}>
              <WarningCircle size={32} color="var(--color-text-muted)" weight="light" style={{ marginBottom: '1rem' }} />
              <p style={{ color: 'var(--color-text-secondary)' }}>No books found.</p>
            </div>
          ) : (
            <div className="w-full" style={styles.grid}>
              {books.map((book: any) => (
                <div key={book._id} className="card" style={styles.bookCard}>
                  {book.coverImg ? (
                    <img src={book.coverImg} alt={book.title} style={styles.bookCover} />
                  ) : (
                    <div style={styles.bookCoverPlaceholder}>
                      <BookOpen size={32} color="var(--color-text-muted)" weight="light" />
                    </div>
                  )}
                  <div style={styles.bookInfo}>
                    <h3 style={styles.bookTitle}>{book.title}</h3>
                    <p style={styles.bookAuthors}>{book.authors?.join(', ')}</p>
                    
                    <div style={styles.bookMeta}>
                      {book.category?.map((cat: string) => (
                        <span key={cat} className="badge badge-muted">{cat}</span>
                      ))}
                    </div>

                    <div style={styles.bookFooter}>
                      {book.avl > 0 ? (
                        <span className="badge badge-seafoam">Available</span>
                      ) : (
                        <span className="badge badge-rose">Out of Stock</span>
                      )}
                      <span style={styles.copiesText}>{book.avl} / {book.total} copies</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    backgroundColor: 'var(--color-bg-base)',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    height: '64px',
    borderBottom: '1px solid var(--color-border)',
    display: 'flex',
    alignItems: 'center',
    padding: '0 2rem',
    backgroundColor: 'var(--color-bg-base)',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    textDecoration: 'none',
    letterSpacing: '0.04em',
    transition: 'color 150ms ease',
  },
  headerDivider: {
    color: 'var(--color-border)',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
  },
  headerTitle: {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--color-text-primary)',
    letterSpacing: '0.04em',
  },
  main: {
    display: 'flex',
    flex: 1,
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    padding: '2rem',
    gap: '3rem',
    alignItems: 'flex-start',
  },
  sidebar: {
    width: '240px',
    position: 'sticky',
    top: 'calc(64px + 2rem)',
  },
  searchBox: {
    position: 'relative',
    marginBottom: '2rem',
  },
  searchInput: {
    width: '100%',
    backgroundColor: 'var(--color-bg-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--color-text-primary)',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    padding: '10px 14px 10px 36px',
    outline: 'none',
    transition: 'border-color 150ms ease',
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  filterTitle: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--color-text-muted)',
    marginBottom: '0.5rem',
  },
  filterBtn: {
    background: 'none',
    border: 'none',
    textAlign: 'left',
    padding: '6px 0',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'color 150ms ease',
  },
  content: {
    flex: 1,
  },
  stateCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4rem 0',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '1.5rem',
  },
  bookCard: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0',
    overflow: 'hidden',
    height: '100%',
  },
  bookCover: {
    width: '100%',
    height: '160px',
    objectFit: 'cover',
    borderBottom: '1px solid var(--color-border)',
  },
  bookCoverPlaceholder: {
    width: '100%',
    height: '160px',
    backgroundColor: 'var(--color-bg-surface)',
    borderBottom: '1px solid var(--color-border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookInfo: {
    padding: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  bookTitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    margin: '0 0 0.25rem 0',
    lineHeight: 1.4,
  },
  bookAuthors: {
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    color: 'var(--color-text-secondary)',
    margin: '0 0 1rem 0',
  },
  bookMeta: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '1.5rem',
  },
  bookFooter: {
    marginTop: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '1rem',
    borderTop: '1px solid var(--color-border)',
  },
  copiesText: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    color: 'var(--color-text-muted)',
  },
}

```

### frontend\src\features\public\LandingPage.tsx
```tsx
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Student, IdentificationBadge, Books } from '@phosphor-icons/react'

const cards = [
  {
    id: 'student',
    label: 'Student',
    description: 'Access your dashboard, borrow books, track fines, and manage your profile.',
    icon: Student,
    accent: 'var(--color-accent-lavender)',
    accentDim: 'var(--color-accent-lavender-dim)',
    href: '/login/student',
  },
  {
    id: 'employee',
    label: 'Employee',
    description: 'Manage approvals, desk operations, inventory orders, and student records.',
    icon: IdentificationBadge,
    accent: 'var(--color-accent-seafoam)',
    accentDim: 'var(--color-accent-seafoam-dim)',
    href: '/login/employee',
  },
  {
    id: 'catalogue',
    label: 'Browse Catalogue',
    description: 'Explore the full book collection. No account required.',
    icon: Books,
    accent: 'var(--color-accent-amber)',
    accentDim: 'var(--color-accent-amber-dim)',
    href: '/catalogue',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any } },
}

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg-base)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
            marginBottom: '1rem',
          }}
        >
          Library Management System
        </p>

        
        <h1
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 800,
            letterSpacing: '-0.05em',
            textTransform: 'uppercase',
            color: 'var(--color-text-primary)',
            lineHeight: 1,
            margin: 0,
          }}
        >
          Library
        </h1>

        
        <div
          style={{
            width: '40px',
            height: '1px',
            backgroundColor: 'var(--color-border)',
            margin: '1.5rem auto 0',
          }}
        />
      </motion.div>

      
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2rem',
          width: '100%',
          maxWidth: '900px',
        }}
      >
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <motion.button
              key={card.id}
              variants={item}
              onClick={() => navigate(card.href)}
              whileHover={{ x: 2, y: 2, boxShadow: '0px 0px 0px 0px #111111' }}
              transition={{ duration: 0.075, ease: [0, 0, 0.2, 1] }}
              style={{
                backgroundColor: 'var(--color-bg-card)',
                border: '2px solid var(--color-border)',
                boxShadow: '4px 4px 0px 0px #111111',
                padding: '2.5rem 2rem',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: card.accentDim,
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                <Icon size={20} color={card.accent} weight="light" />
              </div>

              
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  margin: 0,
                  letterSpacing: '-0.01em',
                }}
              >
                {card.label}
              </p>

              
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {card.description}
              </p>

              
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: card.accent,
                  marginTop: 'auto',
                  paddingTop: '0.5rem',
                }}
              >
                Enter →
              </span>
            </motion.button>
          )
        })}
      </motion.div>

      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--color-text-dim)',
          marginTop: '3rem',
          letterSpacing: '0.06em',
        }}
      >
        v1.0 · Enterprise Library Management
      </motion.p>
    </div>
  )
}

```

### frontend\src\features\student\StudentCataloguePage.tsx
```tsx
import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { searchBooks, getCategories, requestBook } from '../../api'
import { MagnifyingGlass, BookOpen, WarningCircle } from '@phosphor-icons/react'

export default function StudentCataloguePage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')

  const { data, isLoading, isError } = useQuery({
    queryKey: ['books', search, category],
    queryFn: () => searchBooks({ search, category }),
  })

  const { data: catData } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  const requestMutation = useMutation({
    mutationFn: (isbn: string) => requestBook({ isbn }),
    onSuccess: () => {
      toast.success('Book requested successfully!')
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to request book.')
    }
  })

  const books = data?.data || []
  const categoriesList = ['', ...(catData?.data?.filter((c: string) => c) || [])]

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.headerTitle}>Library Catalogue</h1>
        </div>
      </header>

      <main className="flex flex-col flex-1 w-full py-8 gap-8 items-start pb-24 pl-8 pr-24">
        
        {/* Horizontal Filters Bar */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[var(--color-border)] pb-6">
          <div className="flex flex-row overflow-x-auto gap-2 w-full md:w-auto flex-1 items-center pb-2 md:pb-0">
            <span style={{...styles.filterTitle, marginBottom: 0, marginRight: '0.5rem'}}>Categories:</span>
            {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  ...styles.filterBtn,
                  padding: '6px 16px',
                  borderRadius: '999px',
                  backgroundColor: category === cat ? 'var(--color-text-primary)' : 'transparent',
                  color: category === cat ? 'var(--color-bg-base)' : 'var(--color-text-secondary)',
                  fontWeight: category === cat ? 600 : 400,
                  whiteSpace: 'nowrap',
                  border: category === cat ? '1px solid var(--color-text-primary)' : '1px solid var(--color-border)'
                }}
              >
                {cat === '' ? 'All' : cat}
              </button>
            ))}
          </div>

          <div style={{ ...styles.searchBox, marginBottom: 0 }} className="w-full md:w-[300px] flex-shrink-0">
            <MagnifyingGlass size={16} color="var(--color-text-muted)" style={{ position: 'absolute', left: 12, top: 10 }} />
            <input
              type="text"
              placeholder="Search title or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
            />
          </div>
        </div>

        <section style={styles.content} className="w-full">
          {isLoading ? (
            <div style={styles.stateCenter}>Loading...</div>
          ) : isError || books.length === 0 ? (
            <div style={styles.stateCenter}>
              <WarningCircle size={32} color="var(--color-text-muted)" weight="light" style={{ marginBottom: '1rem' }} />
              <p style={{ color: 'var(--color-text-secondary)' }}>No books found.</p>
            </div>
          ) : (
            <div className="w-full" style={styles.grid}>
              {books.map((book: any) => {
                const isOutOfStock = book.avl === 0
                return (
                  <div key={book._id} className="card" style={styles.bookCard}>
                    {book.coverImg ? (
                      <img src={book.coverImg} alt={book.title} style={styles.bookCover} />
                    ) : (
                      <div style={styles.bookCoverPlaceholder}>
                        <BookOpen size={32} color="var(--color-text-muted)" weight="light" />
                      </div>
                    )}
                    <div style={styles.bookInfo}>
                      <h3 style={styles.bookTitle}>{book.title}</h3>
                      <p style={styles.bookAuthors}>{book.authors?.join(', ')}</p>
                      
                      <div style={styles.bookMeta}>
                        {book.category?.map((cat: string) => (
                          <span key={cat} className="badge badge-muted">{cat}</span>
                        ))}
                      </div>

                      <div style={styles.bookFooter}>
                        <div>
                          {isOutOfStock ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              <span className="badge badge-rose">Out of Stock</span>
                              {book.expectedReturnDate && (
                                <span style={styles.copiesText}>
                                  Expected Return: {new Date(book.expectedReturnDate).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="badge badge-seafoam">Available</span>
                          )}
                          <span style={styles.copiesText}>{book.avl} / {book.total} copies</span>
                        </div>
                        
                        {isOutOfStock && (
                          <button
                            className="btn btn-primary"
                            style={{ padding: '6px 12px', fontSize: '13px' }}
                            onClick={() => requestMutation.mutate(book.globalBookId)}
                            disabled={requestMutation.isPending && requestMutation.variables === book.globalBookId}
                          >
                            {(requestMutation.isPending && requestMutation.variables === book.globalBookId) ? 'Requesting...' : 'Request Book'}
                          </button>
                        )}
                      </div>

                      
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    backgroundColor: 'var(--color-bg-base)',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    height: '80px',
    borderBottom: '2px solid var(--color-border)',
    display: 'flex',
    alignItems: 'center',
    padding: '0 2rem',
    backgroundColor: 'var(--color-bg-base)',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  headerTitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '18px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    margin: 0,
  },
  main: {
    display: 'flex',
    flex: 1,
    gap: '3rem',
    alignItems: 'flex-start',
  },
  sidebar: {
    width: '240px',
    position: 'sticky',
    top: '2rem',
  },
  searchBox: {
    position: 'relative',
    marginBottom: '2rem',
  },
  searchInput: {
    width: '100%',
    backgroundColor: 'var(--color-bg-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--color-text-primary)',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    padding: '10px 14px 10px 36px',
    outline: 'none',
    transition: 'border-color 150ms ease',
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  filterTitle: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--color-text-muted)',
    marginBottom: '0.5rem',
  },
  filterBtn: {
    background: 'none',
    border: 'none',
    textAlign: 'left',
    padding: '6px 0',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'color 150ms ease',
  },
  content: {
    flex: 1,
  },
  stateCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4rem 0',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '1.5rem',
  },
  bookCard: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0',
    overflow: 'hidden',
    height: '100%',
  },
  bookCover: {
    width: '100%',
    height: '160px',
    objectFit: 'cover',
    borderBottom: '1px solid var(--color-border)',
  },
  bookCoverPlaceholder: {
    width: '100%',
    height: '160px',
    backgroundColor: 'var(--color-bg-surface)',
    borderBottom: '1px solid var(--color-border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookInfo: {
    padding: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  bookTitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    margin: '0 0 0.25rem 0',
    lineHeight: 1.4,
  },
  bookAuthors: {
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    color: 'var(--color-text-secondary)',
    margin: '0 0 1rem 0',
  },
  bookMeta: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '1.5rem',
  },
  bookFooter: {
    marginTop: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '1rem',
    borderTop: '1px solid var(--color-border)',
  },
  copiesText: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    color: 'var(--color-text-muted)',
    display: 'block',
    marginTop: '4px',
  },
}

```

### frontend\src\features\student\StudentDashboard.tsx
```tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { getStudentProfile, getTransactionHistory, payFine, renewBook } from '../../api'
import { User, Receipt, Books, BookOpen } from '@phosphor-icons/react'
import { useState } from 'react'

export default function StudentDashboard() {
  const queryClient = useQueryClient()
  const [payStatus, setPayStatus] = useState<{ loading: boolean; error: string | null; success: boolean }>({ loading: false, error: null, success: false })

  const [editMode, setEditMode] = useState(false)
  const [editForm, setEditForm] = useState<any>({})
  const [updateStatus, setUpdateStatus] = useState<{ loading: boolean; error: string | null; success: boolean }>({ loading: false, error: null, success: false })

  const { data: profileData, isLoading: profileLoading } = useQuery({
    queryKey: ['studentProfile'],
    queryFn: getStudentProfile,
  })

  const { data: historyData, isLoading: historyLoading } = useQuery({
    queryKey: ['studentTransactions'],
    queryFn: getTransactionHistory,
  })

  const renewMutation = useMutation({
    mutationFn: (transactionId: string) => renewBook({ transactionId }),
    onSuccess: () => {
      toast.success('Book renewed successfully!')
      queryClient.invalidateQueries({ queryKey: ['studentTransactions'] })
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to renew book.')
    }
  })

  const profile = profileData?.data
  const transactions = historyData?.data || []

  const activeBorrows = transactions.filter((t: any) => !t.rtrnDate)
  const finedTransactions = transactions.filter((t: any) => t.totalFine > 0)
  const totalFrozenFine = transactions.reduce((sum: number, t: any) => sum + (t.frozenFine || 0), 0)

  const handlePayFines = async (transactionId?: string) => {
    setPayStatus({ loading: true, error: null, success: false })
    try {
      if (transactionId) {
        await payFine({ transactionId })
      } else {
        await payFine({ payAll: true })
      }
      setPayStatus({ loading: false, error: null, success: true })
      toast.success('Fine paid successfully!')
      queryClient.invalidateQueries({ queryKey: ['studentTransactions'] })
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to pay fines')
      setPayStatus({ loading: false, error: null, success: false })
    }
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdateStatus({ loading: true, error: null, success: false })
    try {
      const { requestProfileUpdate } = await import('../../api')
      await requestProfileUpdate(editForm)
      setUpdateStatus({ loading: false, error: null, success: true })
      toast.success('Profile update requested!')
      setEditMode(false)
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to request update')
      setUpdateStatus({ loading: false, error: null, success: false })
    }
  }

  if (profileLoading || historyLoading) {
    return <div style={styles.loadingState}>Loading dashboard...</div>
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>Welcome back, {profile?.name?.split(' ')[0]}</h1>
        <p style={styles.subtitle}>Here is your library summary.</p>
      </header>

      <div style={styles.grid}>
        
        <div className="card" style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <User size={24} color="var(--color-accent-lavender)" />
              <h2 style={styles.cardTitle}>Profile Summary</h2>
            </div>
            {!editMode && (
              <button
                className="btn btn-secondary"
                style={{ marginLeft: 'auto', padding: '6px 12px', fontSize: '12px' }}
                onClick={() => {
                  setEditForm(profile || {})
                  setEditMode(true)
                }}
              >
                Edit Profile
              </button>
            )}
          </div>
          <div style={styles.cardBody}>
            {editMode ? (
              <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={styles.infoRow}>
                  <label style={styles.infoLabel}>Name</label>
                  <input style={styles.input} type="text" value={editForm.name || ''} onChange={e => setEditForm({...editForm, name: e.target.value})} />
                </div>
                <div style={styles.infoRow}>
                  <label style={styles.infoLabel}>Email</label>
                  <input style={styles.input} type="email" value={editForm.email || ''} onChange={e => setEditForm({...editForm, email: e.target.value})} />
                </div>
                <div style={styles.infoRow}>
                  <label style={styles.infoLabel}>Address</label>
                  <input style={styles.input} type="text" value={editForm.addr || ''} onChange={e => setEditForm({...editForm, addr: e.target.value})} />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setEditMode(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={updateStatus.loading}>
                    {updateStatus.loading ? 'Submitting...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Name</span>
                  <span style={styles.infoValue}>{profile?.name}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Card No</span>
                  <span style={styles.infoValue}>{profile?.cardNo}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Roll No</span>
                  <span style={styles.infoValue}>{profile?.rollNo}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Department</span>
                  <span style={styles.infoValue}>{profile?.dept}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Email</span>
                  <span style={styles.infoValue}>{profile?.email}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Address</span>
                  <span style={styles.infoValue}>{profile?.addr}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Date of Birth</span>
                  <span style={styles.infoValue}>{new Date(profile?.dob).toLocaleDateString()}</span>
                </div>
              </>
            )}
          </div>
        </div>

        
        <div className="card" style={styles.card}>
          <div style={styles.cardHeader}>
            <Receipt size={24} color="var(--color-accent-rose)" />
            <h2 style={styles.cardTitle}>Library Fines</h2>
          </div>
          <div style={styles.cardBody}>
            {finedTransactions.length === 0 ? (
              <p style={styles.emptyState}>You have no library fines.</p>
            ) : (
              <div style={styles.bookList}>
                {finedTransactions.map((txn: any) => {
                  const isReturned = !!txn.rtrnDate
                  return (
                    <div key={txn._id} style={styles.fineItem}>
                      <div style={styles.fineItemLeft}>
                        {txn.b_id?.coverImg ? (
                          <img src={txn.b_id.coverImg} alt="Book cover" style={styles.fineThumb} />
                        ) : (
                          <div style={{...styles.fineThumb, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-bg-base)'}}>
                            <BookOpen size={24} color="var(--color-text-muted)" />
                          </div>
                        )}
                        <div style={styles.fineItemInfo}>
                          <p style={styles.fineItemTitle}>{txn.b_id?.title}</p>
                          <p style={styles.fineItemAmount}>₹{txn.totalFine} {isReturned ? '(Frozen)' : '(Active)'}</p>
                        </div>
                      </div>
                      <div style={styles.fineItemRight}>
                        {isReturned ? (
                          <button
                            className="btn btn-primary"
                            style={{ padding: '6px 12px', fontSize: '12px' }}
                            onClick={() => handlePayFines(txn._id)}
                            disabled={payStatus.loading}
                          >
                            Pay
                          </button>
                        ) : (
                          <button
                            className="btn btn-secondary"
                            style={{ padding: '6px 12px', fontSize: '12px' }}
                            onClick={() => renewMutation.mutate(txn._id)}
                            disabled={renewMutation.isPending && renewMutation.variables === txn._id}
                          >
                            {(renewMutation.isPending && renewMutation.variables === txn._id) ? '...' : 'Renew'}
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {totalFrozenFine > 0 && (
              <button
                className="btn btn-primary"
                onClick={() => handlePayFines()}
                disabled={payStatus.loading}
                style={{ width: '100%', marginTop: '1rem' }}
              >
                {payStatus.loading ? 'Processing...' : `Pay All Frozen Fines (₹${totalFrozenFine})`}
              </button>
            )}

            
          </div>
        </div>

        
        <div className="card" style={{ ...styles.card, gridColumn: '1 / -1' }}>
          <div style={styles.cardHeader}>
            <Books size={24} color="var(--color-accent-amber)" />
            <h2 style={styles.cardTitle}>Currently Borrowed Books</h2>
          </div>
          <div style={styles.cardBody}>
            {activeBorrows.length === 0 ? (
              <p style={styles.emptyState}>You have no active borrowed books.</p>
            ) : (
              <div style={styles.bookListFlex}>
                {activeBorrows.map((txn: any) => {
                  const isOverdue = new Date(txn.dueDate).getTime() < Date.now()
                  return (
                    <div key={txn._id} style={styles.bookItemFlex}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {txn.b_id?.coverImg ? (
                          <img src={txn.b_id.coverImg} alt="Book cover" style={styles.fineThumb} />
                        ) : (
                          <div style={{...styles.fineThumb, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-bg-base)'}}>
                            <BookOpen size={24} color="var(--color-text-muted)" />
                          </div>
                        )}
                        <div style={styles.bookInfo}>
                          <p style={styles.bookTitle}>{txn.b_id?.title || 'Unknown Book'}</p>
                          <p style={styles.bookMeta}>Borrowed: {new Date(txn.borrowDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div style={styles.bookStatus}>
                        <span className={`badge ${isOverdue ? 'badge-rose' : 'badge-seafoam'}`}>
                          Due: {new Date(txn.dueDate).toLocaleDateString()}
                        </span>
                        {isOverdue && <span style={styles.overdueText}>Overdue (+₹{txn.activeFine})</span>}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: '2rem 3rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '2.5rem',
    maxWidth: '1200px',
  },
  loadingState: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    fontFamily: 'var(--font-mono)',
    color: 'var(--color-text-muted)',
    fontSize: '13px',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  title: {
    fontFamily: 'var(--font-sans)',
    fontSize: '28px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    margin: 0,
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '15px',
    color: 'var(--color-text-secondary)',
    margin: 0,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    backgroundColor: 'var(--color-bg-card)',
    border: '2px solid var(--color-border)',
    boxShadow: '4px 4px 0px 0px #111111',
    display: 'flex',
    flexDirection: 'column',
    padding: '1.5rem',
    gap: '1.5rem',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    borderBottom: '2px solid var(--color-border)',
    paddingBottom: '1rem',
  },
  cardTitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    margin: 0,
  },
  cardBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 0',
    borderBottom: '1px solid var(--color-border)',
  },
  infoLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  infoValue: {
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    color: 'var(--color-text-primary)',
    fontWeight: 500,
  },
  emptyState: {
    fontFamily: 'var(--font-mono)',
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    margin: 0,
    textAlign: 'center',
    padding: '2rem 0',
  },
  bookList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  fineItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem',
    border: '2px solid var(--color-border)',
  },
  fineItemLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  fineThumb: {
    width: '40px',
    height: '60px',
    objectFit: 'cover',
  },
  fineItemInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  fineItemTitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--color-text-primary)',
    margin: 0,
  },
  fineItemAmount: {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--color-accent-rose)',
    margin: 0,
  },
  fineItemRight: {
    display: 'flex',
    alignItems: 'center',
  },
  bookListFlex: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  bookItemFlex: {
    flex: '1 1 300px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    border: '2px solid var(--color-border)',
  },
  bookInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  bookTitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '15px',
    fontWeight: 500,
    color: 'var(--color-text-primary)',
    margin: 0,
  },
  bookMeta: {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    margin: 0,
  },
  bookStatus: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '0.5rem',
  },
  overdueText: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    color: 'var(--color-accent-rose)',
  },
  errorAlert: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem',
    backgroundColor: 'rgba(239, 137, 137, 0.1)',
    color: 'var(--color-accent-rose)',
    borderRadius: 'var(--radius-sm)',
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    marginTop: '1rem',
  },
  successAlert: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem',
    backgroundColor: 'rgba(163, 230, 210, 0.1)',
    color: 'var(--color-accent-seafoam)',
    borderRadius: 'var(--radius-sm)',
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    marginTop: '1rem',
  },
}

```

### frontend\src\features\student\StudentHistoryPage.tsx
```tsx
import { useQuery } from '@tanstack/react-query'
import { getTransactionHistory } from '../../api'
import { WarningCircle } from '@phosphor-icons/react'

export default function StudentHistoryPage() {

  const { data, isLoading, isError } = useQuery({
    queryKey: ['studentTransactions'],
    queryFn: getTransactionHistory,
  })

  const transactions = (data?.data || []).filter((txn: any) => !!txn.rtrnDate)

  if (isLoading) {
    return <div style={styles.stateCenter}>Loading history...</div>
  }

  if (isError) {
    return (
      <div style={styles.stateCenter}>
        <WarningCircle size={32} color="var(--color-accent-rose)" />
        <p style={{ marginTop: '1rem', color: 'var(--color-text-secondary)' }}>Failed to load transactions.</p>
      </div>
    )
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>History</h1>
        <p style={styles.subtitle}>View your past borrowed books.</p>
      </header>

      {transactions.length === 0 ? (
        <div style={styles.stateCenter}>
          <p style={{ color: 'var(--color-text-secondary)' }}>You have no transaction history.</p>
        </div>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Book Title</th>
                <th style={styles.th}>Borrow Date</th>
                <th style={styles.th}>Due Date</th>
                <th style={styles.th}>Return Date</th>
                <th style={styles.th}>Fine</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn: any) => {
                return (
                  <tr key={txn._id} style={styles.tr}>
                    <td style={styles.td}>
                      <span style={styles.bookTitle}>{txn.b_id?.title || 'Unknown Book'}</span>
                    </td>
                    <td style={styles.td}>{new Date(txn.borrowDate).toLocaleDateString()}</td>
                    <td style={styles.td}>
                      {new Date(txn.dueDate).toLocaleDateString()}
                    </td>
                    <td style={styles.td}>
                      {new Date(txn.rtrnDate).toLocaleDateString()}
                    </td>
                    <td style={styles.td}>
                      ₹{txn.frozenFine}
                    </td>
                    <td style={styles.td}>
                      <span className="badge badge-muted">Returned</span>
                    </td>
                    <td style={styles.td}>
                      
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: '2rem 3rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '2.5rem',
    maxWidth: '1200px',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  title: {
    fontFamily: 'var(--font-sans)',
    fontSize: '28px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    margin: 0,
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '15px',
    color: 'var(--color-text-secondary)',
    margin: 0,
  },
  stateCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4rem 0',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
  },
  tableContainer: {
    backgroundColor: 'var(--color-bg-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  th: {
    padding: '1rem',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    borderBottom: '1px solid var(--color-border)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  tr: {
    borderBottom: '1px solid var(--color-border)',
    transition: 'background-color 150ms ease',
  },
  td: {
    padding: '1rem',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    color: 'var(--color-text-secondary)',
    verticalAlign: 'middle',
  },
  bookTitle: {
    color: 'var(--color-text-primary)',
    fontWeight: 500,
  },
  errorAlert: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem',
    backgroundColor: 'rgba(239, 137, 137, 0.1)',
    color: 'var(--color-accent-rose)',
    borderRadius: 'var(--radius-sm)',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
  },
  successAlert: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem',
    backgroundColor: 'rgba(163, 230, 210, 0.1)',
    color: 'var(--color-accent-seafoam)',
    borderRadius: 'var(--radius-sm)',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
  },
}

```

### frontend\src\index.css
```css
@import "tailwindcss";

/*
 * DESIGN SYSTEM — Library Management System
 * Aesthetic: Dark charcoal base, muted pastel accents
 * Fonts: Plus Jakarta Sans (body) + Roboto Mono (metadata)
 * Reference: rustic.ai, karolbinkow.ski
 */

@theme {
  /* --- Fonts --- */
  --font-sans: 'Plus Jakarta Sans', sans-serif;
  --font-mono: 'Roboto Mono', monospace;

  /* --- Background Layers --- */
  --color-bg-base: #f5f4ef;
  --color-bg-surface: #ffffff;
  --color-bg-card: #ffffff;
  --color-bg-hover: #ebeae5;

  /* --- Borders --- */
  --color-border: #111111;
  --color-border-subtle: #737373;

  /* --- Typography --- */
  --color-text-primary: #111111;
  --color-text-secondary: #4a4a4a;
  --color-text-muted: #737373;
  --color-text-dim: #a3a3a3;

  /* --- Brutalist Accents --- */
  --color-accent-rose: #e63946;       /* fines, alerts, overdue */
  --color-accent-rose-dim: #ffccd0;   /* rose tinted backgrounds */
  --color-accent-seafoam: #2a9d8f;    /* available, success, confirmed */
  --color-accent-seafoam-dim: #cceae5;
  --color-accent-lavender: #f97316;   /* Orange is the primary CTA now */
  --color-accent-lavender-dim: #ffedd5;
  --color-accent-amber: #e9c46a;      /* warnings, due-soon, pending */
  --color-accent-amber-dim: #fbf3d3;
  
  --shadow-brutal: 4px 4px 0px 0px #111111;
  --shadow-brutal-hover: 2px 2px 0px 0px #111111;

  /* --- Spacing Scale --- */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 40px;
  --spacing-2xl: 64px;

  /* --- Radius --- */
  --radius-sm: 0px;
  --radius-md: 0px;
  --radius-lg: 0px;

  /* --- Transitions --- */
  --ease-default: cubic-bezier(0, 0, 0.2, 1); /* Faster ease out */
  --duration-fast: 75ms;
  --duration-default: 120ms;
}

/*
 * GLOBAL RESET & BASE STYLES
 */

*, *::before, *::after {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html, body, #root {
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-sans);
  background-color: var(--color-bg-base);
  background-image: 
    linear-gradient(to right, #e2e1dc 1px, transparent 1px),
    linear-gradient(to bottom, #e2e1dc 1px, transparent 1px);
  background-size: 20px 20px;
  color: var(--color-text-primary);
  font-size: 15px;
  line-height: 1.6;
}

/*
 * TYPOGRAPHY UTILITIES
 */

.font-mono {
  font-family: var(--font-mono);
}

.text-primary    { color: var(--color-text-primary); }
.text-secondary  { color: var(--color-text-secondary); }
.text-muted      { color: var(--color-text-muted); }
.text-dim        { color: var(--color-text-dim); }
.text-rose       { color: var(--color-accent-rose); }
.text-seafoam    { color: var(--color-accent-seafoam); }
.text-lavender   { color: var(--color-accent-lavender); }
.text-amber      { color: var(--color-accent-amber); }

/*
 * CARD & SURFACE UTILITIES
 */

.card {
  background-color: var(--color-bg-card);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-brutal);
  transition: box-shadow var(--duration-fast) var(--ease-default), transform var(--duration-fast) var(--ease-default);
}

.card:hover {
  box-shadow: var(--shadow-brutal-hover);
  transform: translate(2px, 2px);
}

.surface {
  background-color: var(--color-bg-surface);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
}

/*
 * BUTTON SYSTEM
 */

.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: 9px 18px;
  border-radius: var(--radius-sm);
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: box-shadow var(--duration-fast) var(--ease-default), transform var(--duration-fast) var(--ease-default), background-color var(--duration-fast) var(--ease-default);
  border: 2px solid var(--color-border);
  text-decoration: none;
  white-space: nowrap;
  box-shadow: 2px 2px 0px 0px #111111;
}

.btn:hover {
  box-shadow: 0px 0px 0px 0px #111111;
  transform: translate(2px, 2px);
}

.btn:active {
  box-shadow: 0px 0px 0px 0px #111111;
  transform: translate(2px, 2px);
}

.btn-primary {
  background-color: var(--color-accent-lavender);
  color: #111111;
  border-color: var(--color-border);
}

.btn-primary:hover {
  background-color: #f79043;
}

.btn-secondary {
  background-color: var(--color-bg-surface);
  color: var(--color-text-primary);
  border-color: var(--color-border);
}

.btn-secondary:hover {
  background-color: var(--color-bg-hover);
}

.btn-danger {
  background-color: var(--color-bg-surface);
  color: var(--color-accent-rose);
  border-color: var(--color-border);
}

.btn-danger:hover {
  background-color: var(--color-accent-rose-dim);
}

.btn-success {
  background-color: var(--color-bg-surface);
  color: var(--color-accent-seafoam);
  border-color: var(--color-border);
}

.btn-success:hover {
  background-color: var(--color-accent-seafoam-dim);
}

.btn-warn {
  background-color: var(--color-bg-surface);
  color: var(--color-accent-amber);
  border-color: var(--color-border);
}

.btn-warn:hover {
  background-color: var(--color-accent-amber-dim);
}

.btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none !important;
}

/*
 * INPUT SYSTEM
 */

.input {
  width: 100%;
  background-color: var(--color-bg-surface);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text-primary);
  font-family: var(--font-sans);
  font-size: 14px;
  padding: 10px 14px;
  transition: all var(--duration-fast) var(--ease-default);
  outline: none;
}

.input::placeholder {
  color: var(--color-text-muted);
}

.input:focus {
  border-color: var(--color-accent-lavender);
  box-shadow: 2px 2px 0px 0px var(--color-accent-lavender);
}

.input-error {
  border-color: var(--color-accent-rose) !important;
}

label {
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-muted);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 6px;
}

.field-error {
  font-size: 12px;
  color: var(--color-accent-rose);
  margin-top: 4px;
  font-family: var(--font-mono);
}

/*
 * BADGE SYSTEM
 */

.badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 9px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 500;
  font-family: var(--font-mono);
  letter-spacing: 0.04em;
}

.badge-seafoam  { background: var(--color-accent-seafoam-dim); color: #111111; border: 1px solid var(--color-border); }
.badge-rose     { background: var(--color-accent-rose-dim);    color: #111111; border: 1px solid var(--color-border); }
.badge-amber    { background: var(--color-accent-amber-dim);   color: #111111; border: 1px solid var(--color-border); }
.badge-lavender { background: var(--color-accent-lavender-dim); color: #111111; border: 1px solid var(--color-border); }
.badge-muted    { background: var(--color-bg-surface); color: var(--color-text-primary); border: 1px solid var(--color-border); }

/*
 * DIVIDER
 */

hr {
  border: none;
  border-top: 2px solid var(--color-border);
  margin: var(--spacing-lg) 0;
}

/*
 * TABLE SYSTEM
 */

.table-container {
  width: 100%;
  overflow-x: auto;
  border: 2px solid var(--color-border);
  background: var(--color-bg-surface);
  box-shadow: var(--shadow-brutal);
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

th {
  background-color: var(--color-bg-hover);
  padding: 12px 16px;
  font-family: var(--font-mono);
  font-size: 12px;
  text-transform: uppercase;
  border-bottom: 2px solid var(--color-border);
}

td {
  padding: 16px;
  border-bottom: 1px solid var(--color-border);
}

tr:last-child td {
  border-bottom: none;
}

/*
 * MODAL SYSTEM
 */

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(245, 244, 239, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 1rem;
}

.modal-content {
  background-color: var(--color-bg-surface);
  border: 2px solid var(--color-border);
  box-shadow: 8px 8px 0px 0px var(--color-border);
  padding: 2rem;
  width: 100%;
  max-width: 500px;
}

/*
 * PAGINATION
 */

.pagination {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-lg);
}

.pagination-btn {
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: 12px;
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-default);
}

.pagination-btn:hover:not(:disabled) {
  border-color: var(--color-accent-lavender);
  color: var(--color-accent-lavender);
}

.pagination-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.pagination-info {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-text-muted);
  flex: 1;
  text-align: center;
}

/*
 * SCROLLBAR
 */

::-webkit-scrollbar        { width: 6px; height: 6px; }
::-webkit-scrollbar-track  { background: var(--color-bg-base); }
::-webkit-scrollbar-thumb  { background: var(--color-border); border-radius: 999px; }
::-webkit-scrollbar-thumb:hover { background: #3a3a3d; }

/*
 * MOUNT ANIMATION
 */

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}

.animate-in {
  animation: fadeIn var(--duration-default) var(--ease-default) both;
}

```

### frontend\src\main.tsx
```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './context/AuthContext'
import App from './App'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 2, // 2 minutes
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

```

### frontend\src\types\auth.ts
```typescript
export type Role = 'student' | 'employee'

export interface AuthUser {
  _id: string
  name?: string
  cardNo?: number
  empId?: number
  email?: string
  role: Role
}

```

### frontend\tsconfig.app.json
```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023", "DOM"],
    "module": "esnext",
    "types": ["vite/client"],
    "allowArbitraryExtensions": true,
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}

```

### frontend\tsconfig.json
```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}

```

### frontend\tsconfig.node.json
```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023"],
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "module": "nodenext",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}

```

### frontend\vite.config.ts
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})

```

### package.json
```json
{
  "type": "module",
  "scripts": {
    "dev": "nodemon backend/src/index.js",
    "start": "node backend/src/index.js"
  },
  "dependencies": {
    "bcrypt": "^6.0.0",
    "cloudinary": "^2.10.0",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.6",
    "dotenv": "^17.4.2",
    "express": "^5.2.1",
    "express-rate-limit": "^8.5.2",
    "jsonwebtoken": "^9.0.3",
    "mongoose": "^9.7.3",
    "multer": "^2.2.0",
    "nodemailer": "^9.0.3",
    "zod": "^4.4.3"
  },
  "devDependencies": {
    "nodemon": "^3.1.14",
    "prettier": "^3.9.4"
  }
}

```

### README.md
```markdown
# Library Management System

## 1. Brief Summary of the Project
An industry-grade, domain-driven Library Management System built with the MERN stack and TypeScript. It features distinct, secure portals for Students and Library Staff, automated fine tracking, real-time inventory management, email notifications, and a highly structured Neo-Brutalist user interface.

---

## 2. System Control Flow & Edge Case Handling
The application abandons traditional, static feature lists in favor of interconnected, state-driven domain workflows between Students and the Library Staff.

- **The Registration Pipeline:** When a student registers, their account is placed in a pending state. They cannot log in immediately. Their uploaded Government ID is beamed to Cloudinary, and the URL reference is stored. An employee must manually review and `approve` the registration in their dashboard. 
  - *Edge Case Handled:* If a student tries to register with a duplicate Roll Number, the MongoDB uniqueness constraint triggers a clean `409 Conflict` error on the frontend, gracefully prompting the user to log in instead of crashing the server. Upon employee approval, the system fires an automated Nodemailer SMTP email welcoming the student.

- **The Waitlist & Order Fulfillment Loop:** If a student cannot find a book, they issue a formal "Book Request". This places a ticket in the Employee dashboard. The employee can then order the physical copies.
  - *Edge Case Handled:* When the shipment arrives, the employee marks the order as "Received." The backend processes a unified MongoDB Transaction (`sessionWrapper`) that strictly atomically updates the library stock, deletes the pending requests, and iterates through every single waiting student to dispatch a "Book Now Available" email. If the email dispatch fails for one student, it does not rollback the stock update, isolating non-critical failures.

- **Dynamic Fine Algorithm & Waivers:** Fines are not statically saved every day via a cron job (which is prone to failure). Instead, they are calculated completely dynamically upon request (`activeFine`). 
  - *Edge Case Handled:* A student cannot pay an active fine while they still hold the book, as the fine is continuously growing. Only when the physical book is returned does the active fine crystallize into a `frozenFine` on the transaction record. From there, the student can pay it off, or an Employee can utilize their elevated RBAC override to manually waive the fine (zeroing the ledger).


---

## 3. Standout Features for Engineering Teams

- **Strict RBAC:** Absolute segregation between Student and Employee scopes with dedicated middlewares to prevent privilege escalation.
- **Stateless Auth:** Scalable authentication using HTTP-only JWTs and bcrypt, eliminating database session overhead.
- **Defensive API Design:** Protected by rate limiting, strict file upload validation, and global error handling for consistent responses.
- **Neo-Brutalist UX:** A bespoke design system built from scratch with custom CSS and Framer Motion, avoiding generic component libraries.
- **Custom CLI Tool:** An `adminSetup.js` script bypassing the UI for rapid database seeding, data injection, and staging environment setups.

---

## 4. Capabilities of the God Mode CLI
The CLI (`backend/src/scripts/adminSetup.js`) is an elevated administrative tool operating outside the UI. It provides direct, raw manipulation of the MongoDB database for super-admins:
- **Seed the Database:** Safely inserts dummy data (`--seed`) from local JSON files, gracefully skipping duplicates to establish a working environment instantly.
- **Add Entity:** Inject raw JSON directly into the database (`--add student '{"name": "John"}'`).
- **Remove Entity:** Delete documents by exact ObjectId (`--remove book <id>`).
- **Database Flush (DANGER):** Wipes the entire database clean in a single command (`--flush`).

---

## 5. Technicalities (Tech Stack & Services)

**Frontend:** 
- React 18, Vite, TypeScript
- Tailwind CSS with custom Neo-Brutalist CSS tokens
- Framer Motion (Animations)
- React Router DOM v6, React Context API

**Backend:**
- Node.js, Express.js
- MongoDB (via Mongoose)
- JWT (Stateless Authentication), bcrypt (Password Hashing)
- Multer (File Upload Interception)

**External Services:**
- **Google Books API:** Fetches book metadata and cover art dynamically.
- **Cloudinary:** Cloud storage for Government ID image uploads.
- **Nodemailer / SMTP:** Automated email dispatching engine for alerts and warnings.
- **Tawk.to:** Live chat widget and helpdesk portal integration.

---

## 6. Design Inspiration, Sources, & Icons
- **Aesthetic:** The application utilizes a **Neo-Brutalist** design system characterized by stark borders, flat pastel accents, and high-contrast brutalist shadows. It draws heavy inspiration from modern brutalist web trends (e.g., rustic.ai, karolbinkow.ski).
- **Typography:** *Plus Jakarta Sans* is used for clean, highly legible body text, paired with *Roboto Mono* for structured metadata, badges, and tables.
- **Icons & Assets:** All crisp UI symbology is powered entirely by **Phosphor Icons** (`@phosphor-icons/react`). Because the system utilizes lightweight SVG React components and Cloudinary for user images, it is completely devoid of heavy, locally stored physical assets.

---

## 7. How to Use the App & Seed Features

### Environment Setup
1. Clone the repository and install dependencies in both folders:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
2. Create a `.env` file in the **backend**:
   ```env
   PORT=8000
   MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/library
   CORS_ORIGIN=http://localhost:5173
   ACCESS_TOKEN_SECRET=your_super_secret_key
   CLOUDINARY_CLOUD_NAME=your_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   ```
3. Create a `.env` file in the **frontend**:
   ```env
   VITE_API_URL=http://localhost:8000/api
   VITE_TAWKTO_PROPERTY_ID=your_property_id
   ```

### Running and Seeding
1. Start both servers:
   ```bash
   # Terminal 1
   cd backend && npm run dev
   # Terminal 2
   cd frontend && npm run dev
   ```
2. **Seeding the App:** To test the application immediately without manually registering users, open a terminal in the `backend/` directory and run:
   ```bash
   node src/scripts/adminSetup.js --seed
   ```
   This will populate your database with books, mock transactions, approved students, and an initial employee account (e.g., `empId: 1001`, `password: password123`), allowing you to log into the Employee portal right away.

---

## 8. File Structure
The application follows a strictly separated, domain-driven architecture:

```text
LibProj/
├── frontend/src/
│   ├── api/                  # Axios clients and interceptors
│   ├── components/           # Shared, global components (layout, ui)
│   ├── context/              # Global state providers (AuthContext)
│   ├── features/             # Domain-driven modules
│   │   ├── auth/             # Login, Registration, Password Reset
│   │   ├── employee/         # Admin dashboards, request management
│   │   ├── public/           # Landing page, public catalogue
│   │   └── student/          # Student portal, borrowing history
│   └── types/                # TypeScript interface definitions
│
└── backend/src/
    ├── controllers/          # Request handlers and core business logic

    ├── db/                   # Database connections and mock JSON seed data
    ├── middlewares/          # JWT auth, Multer upload interceptors
    ├── models/               # Mongoose schemas
    ├── routes/               # Express routing endpoints
    ├── scripts/              # God-mode Administrative CLI tools
    └── utils/                # Cloudinary uploaders, mailer, and error handlers
```

```

