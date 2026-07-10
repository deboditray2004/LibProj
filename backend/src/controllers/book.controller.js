import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import { Book } from "../models/book.model.js";
import { BookRequest } from "../models/bookRequest.model.js";
import { Order } from "../models/order.model.js";
import { searchGlobalBook, fetchAndFormatBookData } from "../utils/googleBooksAPI.js";


const requestBook = asyncHandler(async (req, res) => {
    const { isbn } = req.body;
    
    if (!isbn) throw new ApiError(400, "Please provide the ISBN");
    
    const bookRequest = await BookRequest.create({
        s_id: req.student._id,
        isbn
    });
    
    return res.status(201).json(new ApiResponse(201, bookRequest, "Book request placed successfully"));
});

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
    );
});

const rejectRequest = asyncHandler(async (req, res) => {
    
    const { requestIds } = req.body;
    if (!requestIds || !Array.isArray(requestIds) || requestIds.length === 0) {
        throw new ApiError(400, "Please provide an array of request IDs to reject");
    }

    await BookRequest.deleteMany({ _id: { $in: requestIds } });

    return res.status(200).json(
        new ApiResponse(200, null, "Book requests rejected successfully")
    );
});

const placeOrder = asyncHandler(async (req, res) => {
    const { isbn, copiesOrdered, requestIds } = req.body
    if (!isbn || !copiesOrdered || !requestIds || !Array.isArray(requestIds) || requestIds.length === 0)
    throw new ApiError(400, "Missing required order details or invalid requestIds array");

    const match = await searchGlobalBook(isbn);
    if (!match)
    throw new ApiError(404, "Book not found in global catalogue");
    
    const order = await Order.create({
        globalBookId: match.globalBookId,
        orderTitle: match.orderTitle,
        authors: match.authors,
        coverImg: match.coverImg,
        category: match.category,
        copiesOrdered
    });
    
    await BookRequest.deleteMany({ _id: { $in: requestIds } });
    
    return res.status(201).json(new ApiResponse(201, order, "Order placed successfully"));
});

const manualOrder = asyncHandler(async (req, res) => {
    
    const { isbn, copiesOrdered} = req.body
    if(!isbn || copiesOrdered<=0)
    throw new ApiError(400, "Missing required order details or invalid copies ordered");
    
    const match = await searchGlobalBook(isbn);
    if (!match)
    throw new ApiError(404, "Book not found in global catalogue");
    
    const order = await Order.create({
        globalBookId: match.globalBookId,
        orderTitle: match.orderTitle,
        authors: match.authors,
        coverImg: match.coverImg,
        category: match.category,
        copiesOrdered
    });
    
    await BookRequest.deleteMany({ isbn });
    
    return res.status(201).json(new ApiResponse(201, order, "Order placed successfully"));
});

const receiveOrder = asyncHandler(async (req, res) => {

    const {orderId} = req.params;
    if(!orderId)
    throw new ApiError(400, "Missing order ID");

    const order = await Order.findById(orderId);
    if(!order)
    throw new ApiError(404, "Order not found");
    
    const existingBook = await Book.findOne({ globalBookId: order.globalBookId });
    
    if (existingBook) {
        existingBook.total += order.copiesOrdered;
        existingBook.avl += order.copiesOrdered;
        await existingBook.save();
    } else {
        await Book.create({
            globalBookId: order.globalBookId,
            title: order.orderTitle,
            authors: order.authors,
            category: order.category,
            coverImg: order.coverImg,
            total: order.copiesOrdered,
            avl: order.copiesOrdered
        });
    }

    order.status = "Received";
    await order.save();
    
    return res.status(200).json(
        new ApiResponse(200, order, "Order received successfully")
    );
});



const getAllBooks = asyncHandler(async (req, res) => {
    const { search, category } = req.query;
    
    const query = {};
    
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: "i" } },
            { authors: { $regex: search, $options: "i" } }
        ];
    }
    
    if (category)
    query.category = { $regex: category, $options: "i" };
    
    const books = await Book.find(query);
    
    if (!books || books.length === 0) {
        throw new ApiError(404, "No books found matching your criteria");
    }
    
    return res.status(200).json(
        new ApiResponse(200, books, "Books fetched successfully")
    );
});

const getBookById = asyncHandler(async (req, res) => {
    
    const {bookId} = req.params;
    if(!bookId)
    throw new ApiError(400, "Missing book ID");
    
    const book = await Book.findById(bookId);
    if(!book)
    throw new ApiError(404, "Book not found");
    
    return res.status(200).json(
        new ApiResponse(200, book, "Book fetched successfully")
    );
});

export {
    requestBook,
    getAggregatedRequests,
    rejectRequest,
    placeOrder,
    manualOrder,
    receiveOrder,
    getAllBooks,
    getBookById
};
