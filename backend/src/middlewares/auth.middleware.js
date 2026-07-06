import {ApiError} from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"
import {Student} from "../models/student.model.js"
import {Employee} from "../models/employee.model.js"

const verifyStudent =  asyncHandler( async ( req,_,next) =>
{
    try{
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")

        if(!token)
        throw new ApiError(401,"Unauthorized request")

        const decodedToken =jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

        const student = await Student.findById(decodedToken?._id).select("-password -refreshToken")

        if(!student)
        throw new ApiError(401,"Invalid Access Token")

        req.student=student
        next()
    }
    catch(error)
    {
        throw new ApiError(401,"Invalid access token", error)
    }
        
})

const verifyEmployee =  asyncHandler( async ( req,_,next) =>
{
    try{
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")

        if(!token)
        throw new ApiError(401,"Unauthorized request")

        const decodedToken =jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

        const employee = await Employee.findById(decodedToken?._id).select("-password -refreshToken")

        if(!employee)
        throw new ApiError(401,"Invalid Access Token")

        req.employee=employee
        next()
    }
    catch(error)
    {
        throw new ApiError(401,"Invalid access token", error)
    }
        
})

export {verifyStudent, verifyEmployee}