import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'
import os from 'os'

let transporter = null

export const sendMail = async (to, subject, htmlContent, replyTo = null) => {
    try {
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
            console.log(`\n=== [MAILER MOCK] ===\nTo: ${to}\nSubject: ${subject}\n=====================\n`)
            return { success: true, message: "Mock email sent (Missing SMTP Credentials)" }
        }

        if (!transporter) {
            transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST || 'smtp.gmail.com',
                port: process.env.SMTP_PORT || 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                }
            })
        }

        const info = await transporter.sendMail({
            from: `"Library Management System" <${process.env.SMTP_USER}>`,
            to,
            ...(replyTo && { replyTo }),
            subject,
            html: htmlContent
        })
        const logFile = path.resolve(os.tmpdir(), 'mail_log.json')
        fs.appendFileSync(logFile, JSON.stringify({ to, success: true, messageId: info.messageId }) + '\n')
        return { success: true, messageId: info.messageId }
    } catch (error) {
        const logFile = path.resolve(os.tmpdir(), 'mail_log.json')
        fs.appendFileSync(logFile, JSON.stringify({ to, success: false, error: error.message }) + '\n')
        console.error("Error sending email:", error)
        return { success: false, error }
    }
}
