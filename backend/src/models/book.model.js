import mongoose, { Schema } from "mongoose";

/*
 * Added `index: true` to fields like title, authors, and category because they are frequently searched.
 * 
 * Without an index (Collection Scan): MongoDB has to read every single book in the database one-by-one to find a title.
 * With an index: MongoDB creates an optimized B-Tree behind the scenes. It jumps instantly to the correct book, 
 * just like using the index at the back of a physical encyclopedia!
 */

const bookSchema= new Schema({
    globalBookId: {
        type: String,
        unique: true,
        sparse: true 
    },
    title:{
        type:String,
        trim:true,
        required:true,
        index:true
    },
    authors:[
        {
            type:String,
            trim:true,
            required:true,
            index:true
        }
    ],
    category:[
        {
            type:String,
            trim:true,
            required:true,
            index:true
        }
    ],
    coverImg:{
        type:String
    },
    total:{
        type:Number,
        default:0
    },
    avl:{
        type:Number,
        default:0
    }
},
{
    timestamps: true
}) 

export const Book= mongoose.model("Book",bookSchema)
