import { ApiError } from "../utils/ApiError.js"

export const validate = (schema) => async (req, res, next) => {
    try {
        const parseResult = await schema.parseAsync(req.body)
        req.body = parseResult
        next()
    } catch (error) {
        const errorMessages = error.errors.map((err) => `${err.path.join('.')}: ${err.message}`)
        throw new ApiError(400, "Validation Error", errorMessages)
    }
}
