import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js"
import { Student } from "../models/student.model.js"

const generateAccessAndRefereshTokens = async(studentId)=>{

    try{
        const student =await Student.findById(studentId)

        const accessToken = await student.generateAccessToken()
        const refreshToken = await student.generateRefreshToken()

        student.refreshToken = refreshToken
        await student.save({validateBeforeSave:false})

        return {accessToken, refreshToken}
    }
    catch(error){
        throw new ApiError(500,"Error while generating refresh and access tokens", error)
    }
}

const registerStudent = asyncHandler( async (req, res) => {
    
    const {name, dob, addr, email, dept, rollNo, password } = req.body


    const existingStudent = await Student.findOne({ rollNo })
    if(existingStudent)
    throw new ApiError(409, "Student already registered")
    



    const govtIdLocalPath = req.files?.govtId?.[0]?.path
    let g_id
    if (govtIdLocalPath){
        g_id = await uploadOnCloudinary(govtIdLocalPath)
        if (!g_id?.url)
        throw new ApiError(400, "cloudinary failed to generate g_i")
    }
    else
    throw new ApiError(400, "Government Id is required")


    const student = new Student({
        name,
        govtId: g_id.url,
        dept,
        rollNo,
        dob,
        addr,
        email, 
        password,
    })
    try {
        await student.save()
    } catch (error) {
        if (g_id && g_id.url) {
            await deleteFromCloudinary(g_id.url)
        }
        throw error
    }


    const createdStudent = await Student.findById(student._id).select(
        "-password -refreshToken"
    )
    if (!createdStudent)
    throw new ApiError(500, "Something went wrong while registering the user")



    return res.status(201)
    .json(
        new ApiResponse(200, createdStudent, "Student registered Successfully")
    )

})

const loginStudent= asyncHandler(async(req, res) =>{

    const {cardNo , password} = req.body

    const student=await Student.findOne({cardNo})
    if(!student)
    throw new ApiError(404, "Student not found")
    if (student.status === "Pending")
    throw new ApiError(403, "Your account is pending Admin approval")

    const isPasswordCorrect = await student.isPasswordCorrect(password)
    if(!isPasswordCorrect)
    throw new ApiError(401, "Invalid password")

    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(student._id)

    const loggedInStudent = await Student.findById(student._id).select("-password -refreshToken")
    
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
                student : loggedInStudent, accessToken, refreshToken
            },
            "Student logged In Successfully"
        )
    )
    

})

const logoutStudent = asyncHandler(async(req,res) =>{
    await Student.findByIdAndUpdate(
        req.student._id,
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
            "Student logged out Successfully"
        )
    )
})

const getStudentProfile = asyncHandler(async (req, res) => {
    
    const student = await Student.findById(req.student._id).select("-password -refreshToken")
    if (!student) {
        throw new ApiError(404, "Student not found")
    }

    return res.status(200).json(
        new ApiResponse(200, student, "Student profile loaded successfully")
    )
})

const requestProfileUpdate = asyncHandler(async (req, res) => {
    const updates = req.body

    delete updates.cardNo
    delete updates.status
    delete updates.tot_fine

    const student = await Student.findById(req.student._id)
    if (!student) throw new ApiError(404, "Student not found")
    
    student.pendingEdits = {
        ...(student.pendingEdits || {}),
        ...updates
    }
    await student.save({ validateBeforeSave: false })

    return res.status(200).json(
        new ApiResponse(200, student.pendingEdits, "Profile update requested successfully. Pending admin approval.")
    )
})

export {
    registerStudent,
    loginStudent,
    logoutStudent,
    getStudentProfile,
    requestProfileUpdate
}


