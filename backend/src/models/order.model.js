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