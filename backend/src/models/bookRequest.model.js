import mongoose, { Schema } from "mongoose";

const bookRequestSchema= new Schema({
    s_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required : true,
    },
    requestedTitle: {
        type: String,
        required: true,
        trim: true
    },
    requestedAuthor: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

export const BookRequest = mongoose.model("BookRequest", bookRequestSchema);