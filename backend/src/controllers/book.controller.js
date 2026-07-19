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

    let existingRequest = await BookRequest.findOne({ isbn })
    
    if (existingRequest) {
        existingRequest.requestCount += 1;
        await existingRequest.save();
        return res.status(201).json(new ApiResponse(201, existingRequest, "Book request incremented successfully"))
    }

    const match = await searchGlobalBook(isbn)
    if (!match) {
        throw new ApiError(400, "Invalid ISBN. Book not found in global catalogue.")
    }

    const newRequest = await BookRequest.create({
        isbn,
        requestCount: 1,
        title: match.orderTitle || "Unknown Title",
        authors: match.authors && match.authors.length > 0 ? match.authors : ["Unknown Author"],
        category: match.category && match.category.length > 0 ? match.category : ["General"],
        coverImg: match.coverImg || ""
    })

    return res.status(201).json(new ApiResponse(201, newRequest, "Book request placed successfully"))
})

const getAggregatedRequests = asyncHandler(async (req, res) => {
    const requests = await BookRequest.find().sort({ requestCount: -1 }).limit(500)
    
    const aggregatedRequests = requests.map(r => ({
        _id: r.isbn,
        count: r.requestCount,
        bookDetails: {
            title: r.title,
            author: r.authors ? r.authors.join(", ") : "Unknown Author",
            category: r.category,
            coverImg: r.coverImg
        }
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

const rejectAllBookRequests = asyncHandler(async (req, res) => {
    await BookRequest.deleteMany({})
    return res.status(200).json(
        new ApiResponse(200, null, "All book requests rejected successfully")
    )
})

const processOrder = asyncHandler(async (req, res) => {

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

const placeOrder = processOrder
const manualOrder = processOrder

const receiveOrder = asyncHandler(async (req, res) => {

    const {orderId} = req.params
    if(!orderId)
    throw new ApiError(400, "Missing order ID")
    const order = await Order.findById(orderId)
    if(!order)
    throw new ApiError(404, "Order not found")

    if(order.status === "Received")
    throw new ApiError(400, "This order has already been received and processed")
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
    
    if (category) {
        const catArray = category.split(',').map(c => c.trim()).filter(c => c)
        if (catArray.length > 0) {
            query.category = { $in: catArray.map(c => new RegExp(`^${c}$`, "i")) }
        }
    }
    let books = await Book.find(query).limit(500).lean()
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
    const orders = await Order.find({}).sort({ createdAt: -1 }).limit(500)
    return res.status(200).json(
        new ApiResponse(200, orders, "Orders fetched successfully")
    )
})

export {
    requestBook,
    getAggregatedRequests,
    rejectBookRequest,
    rejectAllBookRequests,
    placeOrder,
    manualOrder,
    receiveOrder,
    getAllBooks,
    getBookById,
    getAllOrders,
    getAllCategories
}