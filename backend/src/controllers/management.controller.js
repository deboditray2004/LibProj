import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Student } from "../models/student.model.js"
import { sendMail } from "../utils/mailer.js"

const getPendingStudents = asyncHandler(async (req, res) => {
    const students = await Student.find({ status: "Pending" }).select("-password -refreshToken")
    
    return res.status(200).json(
        new ApiResponse(200, students, "Pending students fetched successfully")
    )
})

const approveStudent = asyncHandler(async (req, res) => {

    const { studentId } = req.body

    const student = await Student.findById(studentId)
    if (!student) throw new ApiError(404, "Student not found")
    if (student.status === "Approved") throw new ApiError(400, "Student is already approved")

    let cardNo
    let isUnique = false
    while (!isUnique) {
        cardNo = Math.floor( 1000 + Math.random() * 9000)
        const exists = await Student.findOne({ cardNo })
        if (!exists) isUnique = true
    }

    student.cardNo = cardNo
    student.status = "Approved"
    await student.save({ validateBeforeSave: false }) // skip password validation

    const emailHtml = `
        <h2>Welcome to the Library, ${student.name}!</h2>
        <p>Your registration has been officially approved.</p>
        <p>Your Library Card Number is: <strong>${cardNo}</strong></p>
        <p>You can now use this card number to log into your dashboard and borrow books.</p>
    `
    await sendMail(student.email, "Library Registration Approved", emailHtml)

    return res.status(200).json(
        new ApiResponse(200, { cardNo }, "Student approved successfully")
    )
})

const rejectStudent = asyncHandler(async (req, res) => {

    const { studentId, reason } = req.body


    const student = await Student.findById(studentId)
    if (!student) throw new ApiError(404, "Student not found")

    const emailHtml = `
        <h2>Library Registration Update</h2>
        <p>Dear ${student.name},</p>
        <p>Unfortunately, your library registration request has been declined for the following reason:</p>
        <blockquote style="border-left: 4px solid #ff4444; padding-left: 10px;">
            ${reason}
        </blockquote>
        <p>Please contact the library administration if you have any questions.</p>
    `
    await sendMail(student.email, "Library Registration Declined", emailHtml)

    await Student.findByIdAndDelete(studentId)

    return res.status(200).json(
        new ApiResponse(200, null, "Student registration rejected and deleted successfully")
    )
})

const getPendingProfileEdits = asyncHandler(async (req, res) => {

    const students = await Student.find({ pendingEdits: { $ne: null } }).select("-password -refreshToken")
    
    return res.status(200).json(
        new ApiResponse(200, students, "Pending profile edits fetched successfully")
    )
})

const approveProfileEdit = asyncHandler(async (req, res) => {

    const { studentId } = req.body

    const student = await Student.findById(studentId)
    if (!student) throw new ApiError(404, "Student not found")
    if (!student.pendingEdits) throw new ApiError(400, "No pending edits found for this student")

    //merge edits
    const edits = student.pendingEdits
    Object.keys(edits).forEach(key => {
        student[key] = edits[key]
    })
    
    student.pendingEdits = null
    await student.save({ validateBeforeSave: false })

    const emailHtml = `
        <h2>Profile Update Approved</h2>
        <p>Dear ${student.name},</p>
        <p>Your requested profile updates have been reviewed and approved by management. The changes are now live on your account.</p>
    `
    await sendMail(student.email, "Profile Update Approved", emailHtml)

    return res.status(200).json(
        new ApiResponse(200, student, "Profile edits approved successfully")
    )
})

const rejectProfileEdit = asyncHandler(async (req, res) => {
    const { studentId, reason } = req.body

    const student = await Student.findById(studentId)
    if (!student) throw new ApiError(404, "Student not found")
    if (!student.pendingEdits) throw new ApiError(400, "No pending edits found for this student")

    student.pendingEdits = null
    await student.save({ validateBeforeSave: false })

    const emailHtml = `
        <h2>Profile Update Declined</h2>
        <p>Dear ${student.name},</p>
        <p>Your requested profile updates have been declined by management for the following reason:</p>
        <blockquote style="border-left: 4px solid #ff4444; padding-left: 10px;">
            ${reason}
        </blockquote>
    `
    await sendMail(student.email, "Profile Update Declined", emailHtml)

    return res.status(200).json(
        new ApiResponse(200, null, "Profile edits rejected successfully")
    )
})

export {
    getPendingStudents,
    approveStudent,
    rejectStudent,
    getPendingProfileEdits,
    approveProfileEdit,
    rejectProfileEdit
}
