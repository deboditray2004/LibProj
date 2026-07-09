import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import { Book } from "../models/book.model.js";
import { BookRequest } from "../models/bookRequest.model.js";
import { Order } from "../models/order.model.js";
import { searchGlobalBook, fetchAndFormatBookData } from "../utils/googleBooksAPI.js";

// --- STUDENT FEATURES ---

const requestBook = asyncHandler(async (req, res) => {
    // 1. Get requestedTitle and requestedAuthor from req.body
    
    // 2. Validate they are not empty (using ApiError if they are)
    
    // 3. Create a new BookRequest in the database 
    // Hint: s_id should be req.student._id (from your verifyStudent middleware!)
    
    // 4. Return a 201 ApiResponse!
});


// --- EMPLOYEE FEATURES: ORDER PIPELINE ---

const getAggregatedRequests = asyncHandler(async (req, res) => {
    // 1. Use BookRequest.aggregate() to group by { title: "$requestedTitle", author: "$requestedAuthor" }
    // 2. Calculate the count for each group using { $sum: 1 }
    // 3. Push the original request _ids into an array using { $push: "$_id" }
    // 4. Sort the results so the highest count is at the top
    // 5. Return the aggregated array in an ApiResponse
});

const placeOrder = asyncHandler(async (req, res) => {
    // 1. Get requestedTitle, requestedAuthor, copiesOrdered, and requestIds (array) from req.body
    
    // 2. Call searchGlobalBook(requestedTitle, requestedAuthor) from the googleBooksAPI utility
    
    // 3. If it returns null -> It's an invalid request! 
    //    Delete all BookRequests that match those requestIds, and throw a 404 ApiError.
    
    // 4. If it returns a match -> Create a new Order! 
    //    Pass in globalBookId, orderTitle, authors, coverImg (from the match), and copiesOrdered.
    
    // 5. Delete the original BookRequests (since they are now formally an Order)
    
    // 6. Return a 201 ApiResponse with the created Order
});

const manualOrder = asyncHandler(async (req, res) => {
    // 1. Get title, author, and copiesOrdered from req.body
    // 2. Call searchGlobalBook(title, author)
    // 3. If no match -> throw 404 ApiError ("Book not found in global catalogue")
    // 4. If match -> Create a new Order with the returned data
    // 5. Return 201 ApiResponse
});

const receiveOrder = asyncHandler(async (req, res) => {
    // 1. Get orderId from req.params (e.g., /orders/receive/:orderId)
    // 2. Find the Order by ID. If not found, throw 404.
    
    // 3. Check if a Book already exists with this Order's globalBookId
    // 4. If Book exists -> Update its 'total' and 'avl' by adding order.copiesOrdered
    // 5. If Book DOES NOT exist -> 
    //    a) Call fetchAndFormatBookData(order.globalBookId)
    //    b) Attach total and avl to the formatted data
    //    c) Create the new Book!
    
    // 6. Update the Order status to "Received"
    // 7. Return 200 ApiResponse
});


// --- PUBLIC / CATALOGUE FEATURES ---

const getAllBooks = asyncHandler(async (req, res) => {
    // 1. Fetch all books from the DB
    // 2. Optional: Add search filtering (if req.query.search exists, filter by title/author using $regex)
    // 3. Return ApiResponse
});

const getBookById = asyncHandler(async (req, res) => {
    // 1. Find book by ID (req.params.id)
    // 2. If avl === 0, you will eventually calculate "earliest available date" here
    // 3. Return ApiResponse
});

export {
    requestBook,
    getAggregatedRequests,
    placeOrder,
    manualOrder,
    receiveOrder,
    getAllBooks,
    getBookById
};
