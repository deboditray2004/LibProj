import dotenv from "dotenv"
import connectDB from "./db/index.js"
import { app } from "./app.js"
import { startOverdueWarningsCron } from "./cron/overdueWarnings.js"

dotenv.config({
    path: './backend/.env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(` Server is running at port : ${process.env.PORT || 8000}`)
    })
    startOverdueWarningsCron()
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err)
})

// touch for nodemon
