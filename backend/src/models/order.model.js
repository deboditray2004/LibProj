import mongoose, { Schema } from "mongoose";

const orderSchema=new Schema({
    title:{
        type:String,
        trim:true,
        required:true
    },
    authors:[
        {
            type:String,
            trim:true,
            required:true
        }
    ],
    copies:{
        type:Number,
        default:1
    },
    status:{
        type:String,
        enum:["Approved","Pending"],
        default:"Pending"
    }
},
{
    timestamps:true
})

export const Order=mongoose.model("Order",orderSchema)
 
 