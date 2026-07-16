import mongoose, { Schema } from "mongoose"

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
    timestamps:true,
    optimisticConcurrency: true
})

transactionSchema.post(['save', 'findOneAndUpdate', 'findOneAndDelete'], async function (doc) {
    if (!doc) return
    const s_id = doc.s_id
    const Student = mongoose.model("Student")
    
    // Sum up all frozen fines for this student
    const result = await this.constructor.aggregate([
        { $match: { s_id: new mongoose.Types.ObjectId(s_id) } },
        { $group: { _id: null, totalFine: { $sum: "$frozenFine" } } }
    ])
    
    const tot_fine = result.length > 0 ? result[0].totalFine : 0
    await Student.findByIdAndUpdate(s_id, { tot_fine })
})

export const Transaction= mongoose.model("Transaction",transactionSchema)
