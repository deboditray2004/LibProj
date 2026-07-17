import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Student } from "../models/student.model.js"
import { Employee } from "../models/employee.model.js"
import { sendMail } from "../utils/mailer.js"
import crypto from "crypto"

export const forgotPassword = asyncHandler(async (req, res) => {
    const { email, role } = req.body

    const Model = role === "student" ? Student : Employee
    const user = await Model.findOne({ email })

    if (!user) {
        throw new ApiError(404, "User with this email does not exist")
    }

    if (user.forgotPasswordToken && user.forgotPasswordExpiry > Date.now()) {
        throw new ApiError(429, "A reset link was already sent. Please check your email or wait 15 minutes before requesting a new one.")
    }

    const resetToken = user.createPasswordResetToken()
    
    await user.save({ validateBeforeSave: false })

    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173'
    const resetUrl = `${baseUrl}/reset-password/${resetToken}`

    const message = `
        <h2>Password Reset Request</h2>
        <p>You requested a password reset for your Library ${role} account.</p>
        <p>Please click the link below to reset your password. This link is valid for 15 minutes.</p>
        <a href="${resetUrl}" style="padding:10px 20px; background-color:#4f46e5; color:white; text-decoration:none; border-radius:5px;">Reset Password</a>
        <p>If you did not request this, please ignore this email.</p>
    `

    try {
        await sendMail(
            user.email,
            "Password Reset - Library Management System",
            message
        )

        return res.status(200).json(
            new ApiResponse(200, {}, "Token sent to email successfully")
        )
    } catch (error) {
        user.forgotPasswordToken = undefined
        user.forgotPasswordExpiry = undefined
        await user.save({ validateBeforeSave: false })

        throw new ApiError(500, "There was an error sending the email. Try again later.")
    }
})

export const resetPassword = asyncHandler(async (req, res) => {
    const { token } = req.params
    const { password } = req.body

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex")

    let user = await Student.findOne({
        forgotPasswordToken: hashedToken,
        forgotPasswordExpiry: { $gt: Date.now() }
    })

    if (!user) {
        user = await Employee.findOne({
            forgotPasswordToken: hashedToken,
            forgotPasswordExpiry: { $gt: Date.now() }
        })
    }

    if (!user) {
        throw new ApiError(400, "Token is invalid or has expired")
    }

    user.password = password
    
    user.forgotPasswordToken = undefined
    user.forgotPasswordExpiry = undefined
    
    await user.save()

    return res.status(200).json(
        new ApiResponse(200, {}, "Password reset successful! You can now log in.")
    )
})
