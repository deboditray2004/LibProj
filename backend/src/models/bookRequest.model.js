import mongoose, { Schema } from "mongoose"
const bookRequestSchema= new Schema({
    isbn: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    requestCount: {
        type: Number,
        default: 1
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    authors: [{
        type: String,
        required: true,
        trim: true
    }],
    category: [{
        type: String,
        required: true,
        trim: true
    }],
    coverImg: {
        type: String,
        required: true,
        default: ""
    }
}, { timestamps: true })
export const BookRequest = mongoose.model("BookRequest", bookRequestSchema)