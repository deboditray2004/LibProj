import mongoose, { Schema } from "mongoose";

const notificationSchema=new Schema({
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
        enum:["Read","Unread"],
        default:"Unread"
    }
},
{
    timestamps:true
})

export const Notification=mongoose.model("Notification",notificationSchema)
