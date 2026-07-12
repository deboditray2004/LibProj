import { asyncHandler } from "../utils/asyncHandler.js"
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

    book.avl-=1
    await book.save()
    const transaction = await Transaction.create({
        s_id: student._id,
        b_id: book._id,
        dueDate:new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    })
    return res.status(201).json(new ApiResponse(201,"Book borrowed successfully",transaction))
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
    const activeFine = daysLate * 5
    transaction.frozenFine += activeFine
    book.avl+=1
    await book.save()
    await transaction.save()
    return res.status(200).json(new ApiResponse(200, "Book returned successfully", transaction))
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
    const activeFine = daysLate * 5
    transaction.frozenFine += activeFine
    transaction.renewalCnt += 1
    transaction.dueDate = new Date(now + 7 * 24 * 60 * 60 * 1000)
    await transaction.save()
    return res.status(200).json(new ApiResponse(200,"Book renewed successfully",transaction))
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
            activeFine = daysLate * 5
        }
        
        obj.activeFine = activeFine
        obj.totalFine = obj.frozenFine + activeFine
        return obj
    })
    return res.status(200).json(new ApiResponse(200,"Transactions fetched successfully",updatedTransactions))
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
        for (const txn of transactions) {

            const now = Date.now()
            if (!txn.rtrnDate && now > txn.dueDate)
            continue
            totalPaid += txn.frozenFine
            txn.amountCollected += txn.frozenFine
            txn.frozenFine = 0
            await txn.save()
        }

        if (totalPaid === 0) {
            throw new ApiError(400, "Could not pay fines. All books with fines are actively overdue. Please return/renew them first.")
        }

        return res.status(200).json(
            new ApiResponse(200, `Successfully paid ₹${totalPaid} for all eligible transactions.`, null)
        )
    }

    // pay single transaction
    if (!transactionId)
    throw new ApiError(400, "Please provide a transactionId or set payAll to true.")

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
        new ApiResponse(200, `Successfully paid ₹${totalOwed} for this transaction.`, transaction)
    )
})

export {
    borrowBook,
    returnBook,
    renewBook,
    getTransactionHistory,
    payFine
}