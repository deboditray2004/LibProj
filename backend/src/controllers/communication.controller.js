import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Feedback } from "../models/feedback.model.js"
import { Notification } from "../models/notification.model.js"

const submitFeedback = asyncHandler(async (req, res) => {

    const { msg } = req.body

    const feedback = new Feedback({
        s_id:req.student._id,
        msg
    })
    await feedback.save()

    return res.status(201).json(new ApiResponse(201,feedback,"Feedback submitted successfully"))
    
})

const getStudentInbox = asyncHandler(async (req, res) => {

    const notifs = await Notification.find({
        s_id: req.student._id,
        status: "Unread"
    })
    .sort({ createdAt: -1 })
    if (notifs.length > 0) 
    await Notification.updateMany(
        { s_id: req.student._id, status: "Unread" },
        { $set: { status: "Read" } }
    )
    return res.status(200).json(new ApiResponse(200, notifs, "Inbox fetched successfully"))
})

const getEmployeeInbox = asyncHandler(async (req, res) => {
    
    const feedbacks = await Feedback.find({ status: "Pending reply" })
    .populate("s_id", "name cardNo email")
    .sort({ createdAt: 1 })
    return res.status(200).json(
        new ApiResponse(200, feedbacks, "Inbox fetched successfully")
    )
})

const replyToFeedback = asyncHandler(async (req, res) => {

    const {feedBackId, replyMsg} = req.body
    const feedback = await Feedback.findById(feedBackId)
    if(!feedback)
    throw new ApiError(404, "Feedback not found")

    feedback.status = "Replied"
    await feedback.save()
    const notification = new Notification({
        s_id: feedback.s_id,
        msg: replyMsg
    })
    await notification.save()

    return res.status(200).json(new ApiResponse(200, null, "Feedback replied successfully"))
})
export {
    submitFeedback,
    getStudentInbox,
    getEmployeeInbox,
    replyToFeedback
}