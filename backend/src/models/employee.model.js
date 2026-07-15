import mongoose, { Schema } from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import crypto from "crypto"
const employeeSchema =new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    empId:{
        type:Number,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:[true,'Password is required']
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
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

employeeSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10)
})
employeeSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

employeeSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            empId: this.empId,
            name: this.name,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

employeeSchema.methods.generateRefreshToken = function(){
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

employeeSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString("hex")
    this.forgotPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000 // 15 minutes
    return resetToken
}

export const Employee= mongoose.model("Employee",employeeSchema)
