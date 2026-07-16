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
    }
}, { timestamps: true })
export const BookRequest = mongoose.model("BookRequest", bookRequestSchema)