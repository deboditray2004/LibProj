import mongoose, { Schema } from "mongoose"
const studentRequestSchema= new Schema({
    s_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Student",
        required:true
    },
    title:{
        type:String,
        trim:true,
        required:true
    },
    authors:[
        {
            type:String,
            required:true,
            trim:true,
        }
    ],
    category:[
        {
            type:String,
            required:true,
            trim:true,
        }
    ],
    status:{
        type:String,
        enum:["Approved","Pending"],
        default:"Pending"
    }
},
{
    timestamps:true
})

export const StudentRequest=mongoose.model("StudentRequest",studentRequestSchema)
