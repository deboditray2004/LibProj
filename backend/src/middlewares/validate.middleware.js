import { ApiError } from "../utils/ApiError.js"

export const validate = (schema) => async (req, res, next) => {
    try {
        const parseResult = await schema.parseAsync(req.body)
        req.body = parseResult
        next()
    } catch (error) {
        console.error("VALIDATION ERROR:", error);
        const issues = error.issues || error.errors;
        const errorMessages = issues?.map((err) => `${err.path.join('.')}: ${err.message}`) ?? []
        throw new ApiError(400, errorMessages[0] || "Validation Error", null, errorMessages)
    }
}
