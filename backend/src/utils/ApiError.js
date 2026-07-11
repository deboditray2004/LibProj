/*
=========================================================
^ API ERROR ARCHITECTURE NOTES 
=========================================================
1. Why explicitly declare `this.message = finalMessage`?
   When calling super(message), Node.js creates a NON-enumerable message property.
   If we don't explicitly re-declare it, JSON.stringify() will ignore it, and the 
   Frontend React app will receive an error object with no helpful message string!

2. Why console.error(rawError)?
   While finalMessage contains the text string, the rawError object contains the 
   FULL stack trace and hidden library properties (like Mongoose validation errors). 
   We log this to the backend terminal so the developer can actually find the bug.

3. Why do we keep `this.stack`?
   - In Development mode, we send this.stack in the JSON response so Frontend devs can see what broke.
   - If there is no rawError (e.g. throwing a manual 404 because a student isn't found), 
     Error.captureStackTrace generates a brand new stack trace so we still know which controller threw the 404.

Summary: The Custom Object is packaged for the Frontend. The Console Logs are for the Backend!
=========================================================
*/
class ApiError extends Error {
    constructor(
        statusCode,
        customMessage = "Something went wrong",
        rawError = null,
        errors = []
    ) {
        const finalMessage = rawError ? `${customMessage}: ${rawError.message}` : customMessage
        super(finalMessage)
        this.statusCode = statusCode
        this.message = finalMessage
        this.errors = errors
        this.success = false
        this.data = null
        if (rawError) {
            console.error(`[ApiError Triggered] ${finalMessage}`)
            console.error(rawError)
        }

        if (rawError && rawError.stack) {
            this.stack = rawError.stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }