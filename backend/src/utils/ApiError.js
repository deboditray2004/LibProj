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