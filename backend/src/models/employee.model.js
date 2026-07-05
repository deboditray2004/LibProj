import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
    }
},
{
    timestamps: true
})

employeeSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});


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
            designation: this.designation
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

export const Employee= mongoose.model("Employee",employeeSchema)
