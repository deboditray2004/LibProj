import mongoose, { Schema } from "mongoose"
const feedbackSchema=new Schema({
    s_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student",
        required:true
    },  
    msg:{
        type:String,
        trim:true,
        required:true
    },
    status:{
        type:String,
        enum:["Pending reply","Replied"],
        default:"Pending reply"
    }
},
{   
    timestamps:true
})

export const Feedback=mongoose.model("Feedback",feedbackSchema)
