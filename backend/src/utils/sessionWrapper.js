import mongoose from "mongoose"

const sessionWrapper = async (callback) => {

    const session = await mongoose.startSession()

    session.startTransaction()
    try {

        const result = await callback(session)
        await session.commitTransaction()
        session.endSession()
        return result
    } 
    catch (error) {

        await session.abortTransaction()
        session.endSession()
        throw error
    }
}

export {sessionWrapper}