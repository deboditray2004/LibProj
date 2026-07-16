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


const requestBook = asyncHandler(async (req, res) => {

    const { isbn } = req.body

    const bookRequest = await BookRequest.findOneAndUpdate(
        { isbn },
        { $inc: { requestCount: 1 } },
        { upsert: true, new: true }
    )
    return res.status(201).json(new ApiResponse(201, bookRequest, "Book request placed successfully"))
})

const getAggregatedRequests = asyncHandler(async (req, res) => {

    const requests = await BookRequest.find().sort({ requestCount: -1 })
    
    const aggregatedRequests = requests.map(r => ({
        _id: r.isbn,
        requestCount: r.requestCount
    }))

    return res.status(200).json(
        new ApiResponse(200, aggregatedRequests, "Aggregated requests fetched successfully")
    )
})

const rejectBookRequest = asyncHandler(async (req, res) => {
    
    const { isbn } = req.body

    await BookRequest.deleteOne({ isbn })
    return res.status(200).json(
        new ApiResponse(200, null, "Book request rejected successfully")
    )
})

const placeOrder = asyncHandler(async (req, res) => {

    const { isbn, copiesOrdered } = req.body
    const match = await searchGlobalBook(isbn)
    if (!match)
    throw new ApiError(404, "Book not found in global catalogue")

    const orderResult = await sessionWrapper(async (session) => {
        const order = new Order({
            globalBookId: match.globalBookId,
            orderTitle: match.orderTitle,
            authors: match.authors,
            coverImg: match.coverImg,
            category: match.category,
            copiesOrdered
        })
        await order.save({ session })
        
        await BookRequest.deleteOne({ isbn }).session(session)
        
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
        const order = new Order({
            globalBookId: match.globalBookId,
            orderTitle: match.orderTitle,
            authors: match.authors,
            coverImg: match.coverImg,
            category: match.category,
            copiesOrdered
        })
        await order.save({ session })
        
        await BookRequest.deleteOne({ isbn }).session(session)
        
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