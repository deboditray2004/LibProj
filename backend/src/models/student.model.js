import mongoose, { Schema } from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import crypto from "crypto"
const studentSchema =new Schema({

    cardNo:{
        type:Number,
        unique:true,
        index:true,
        sparse:true
    },
    name:{
        type:String,
        trim:true,
        required:true
    },
    dob:{
        type:Date,
        required:true,
    },
    addr:{
        type:String,
        trim:true,
        required:true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },

    govtId:{
        type:String,
        required:true
    },
    dept:{
        type:String,
        trim:true,
        required:true
    },
    rollNo:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:[true,'Password is required']
    },
    tot_fine:{
        type:Number,
        default:0
    },
    pendingEdits: {
        type: Schema.Types.Mixed,
        default: null
    },
    status:{
        type:String,
        enum:["Approved","Pending"],
        default:"Pending"
    },
    refreshToken: {
        type: String
    },
    forgotPasswordToken: {
        type: String
    },
    forgotPasswordExpiry: {
        type: Date
    }


},
{
    timestamps: true,
    optimisticConcurrency: true
})

studentSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10)
})

studentSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

studentSchema.methods.generateAccessToken = function(){
    if (!this.cardNo) {
        throw new Error("Cannot generate token: Student does not have a Library Card Number yet.")
    }

    return jwt.sign(
        {
            _id: this._id,
            rollNo: this.rollNo,
            cardNo: this.cardNo
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

studentSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

studentSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString("hex")
    this.forgotPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000 // 15 minutes
    return resetToken
}

export const Student= mongoose.model("Student",studentSchema)
