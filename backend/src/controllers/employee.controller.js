import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Employee } from "../models/employee.model.js"

const generateAccessAndRefereshTokens = async(employeeId)=>{

    try{
        const employee =await Employee.findById(employeeId)

        const accessToken = await employee.generateAccessToken()
        const refreshToken = await employee.generateRefreshToken()

        employee.refreshToken = refreshToken
        await employee.save({validateBeforeSave:false})

        return {accessToken, refreshToken}
    }
    catch(error){
        throw new ApiError(500,"Error while generating refresh and access tokens", error)
    }
}


const loginEmployee= asyncHandler(async(req, res) =>{

    const {empId , password} = req.body

    const employee=await Employee.findOne({empId})
    if(!employee)
    throw new ApiError(404, "Employee not found")
    
    const isPasswordCorrect = await employee.isPasswordCorrect(password)
    if(!isPasswordCorrect)
    throw new ApiError(401, "Invalid password")

    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(employee._id)

    const loggedInEmployee = await Employee.findById(employee._id).select("-password -refreshToken")
    
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                employee : loggedInEmployee, accessToken, refreshToken
            },
            "Employee logged In Successfully"
        )
    )
    

})

const logoutEmployee = asyncHandler(async(req,res) =>{
    await Employee.findByIdAndUpdate(
        req.employee._id,
        {
            $unset:{
                refreshToken:1
            }
        },
        {
            new : true
        }
    )

    const options ={
        httpOnly:true,
        secure:true,
        sameSite: "none"
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(
            200,
            {},
            "Employee logged out Successfully"
        )
    )
})

export {
    loginEmployee,
    logoutEmployee
}
