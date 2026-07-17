import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { sendMail } from "../utils/mailer.js"

export const sendSupportMessage = asyncHandler(async (req, res) => {
    const { message } = req.body
    
    if (!message || message.trim().length === 0) {
        throw new ApiError(400, "Message cannot be empty")
    }

    const student = req.student
    if (!student) {
        throw new ApiError(403, "Only authenticated students can send support messages")
    }

    const managementEmail = process.env.MANAGEMENT_EMAIL || 'libraryproj.mgmt@gmail.com'
    const subject = `Support Request from ${student.name} (${student.rollNo})`
    
    const htmlContent = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
            <h2 style="color: #333; margin-top: 0;">New Support Request</h2>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <p style="margin: 0 0 10px 0;"><strong>Student Name:</strong> ${student.name}</p>
                <p style="margin: 0 0 10px 0;"><strong>Roll Number:</strong> ${student.rollNo}</p>
                <p style="margin: 0;"><strong>Email:</strong> ${student.email}</p>
            </div>
            
            <h3 style="color: #444; border-bottom: 1px solid #ccc; padding-bottom: 5px;">Message:</h3>
            <p style="white-space: pre-wrap; color: #111; font-size: 15px; line-height: 1.5;">${message}</p>
            
            <p style="font-size: 12px; color: #888; margin-top: 30px; padding-top: 10px; border-top: 1px solid #eee;">
                You can reply directly to this email to respond to the student.
            </p>
        </div>
    `

    const mailResult = await sendMail(managementEmail, subject, htmlContent, student.email)

    if (!mailResult.success) {
        const errorDetail = mailResult.error?.message || mailResult.error?.code || 'Unknown SMTP Error'
        throw new ApiError(500, `Failed to send message: ${errorDetail}`)
    }

    return res.status(200).json(new ApiResponse(200, {}, "Message sent successfully"))
})
