import mongoose, { Schema } from "mongoose"
import { updateIfCurrentPlugin } from "mongoose-update-if-current"

const transactionSchema= new Schema({
    s_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Student",
        required:true
    },
    b_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Book",
        required:true
    },
    brwDate:{
        type: Date,
        default:Date.now
    },
    dueDate:{
        type: Date,
        required:true
    },
    renewalCnt:{
        type:Number,
        default:0,
        max:2
    },
    rtrnDate:{
        type:Date
    },
    frozenFine:{
        type:Number,
        default:0
    },
    amountCollected:{
        type:Number,
        default:0
    }
},
{
    timestamps:true
})

transactionSchema.plugin(updateIfCurrentPlugin)

export const Transaction= mongoose.model("Transaction",transactionSchema)
