import fs from 'fs'
import path from 'path'
import os from 'os'
import { google } from 'googleapis'

export const sendMail = async (to, subject, htmlContent, replyTo = null) => {
    try {
        if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_REFRESH_TOKEN) {
            console.log(`\n=== [MAILER MOCK] ===\nTo: ${to}\nSubject: ${subject}\n=====================\n`)
            return { success: true, message: "Mock email sent (Missing Google API Credentials)" }
        }

        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            "https://developers.google.com/oauthplayground"
        )
        oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN })

        const gmail = google.gmail({ version: 'v1', auth: oauth2Client })

        const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`
        
        let messageParts = [
            `To: ${to}`,
            `Subject: ${utf8Subject}`,
            `Content-Type: text/html; charset=utf-8`,
            `MIME-Version: 1.0`
        ]
        
        if (replyTo) {
            messageParts.push(`Reply-To: ${replyTo}`)
        }
        
        messageParts.push('')
        messageParts.push(htmlContent)

        const messageStr = messageParts.join('\r\n')
        const encodedMessage = Buffer.from(messageStr).toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '')

        const res = await gmail.users.messages.send({
            userId: 'me',
            requestBody: {
                raw: encodedMessage
            }
        })

        const logFile = path.resolve(os.tmpdir(), 'mail_log.json')
        fs.appendFileSync(logFile, JSON.stringify({ to, success: true, messageId: res.data.id }) + '\n')
        return { success: true, messageId: res.data.id }
    } catch (error) {
        const logFile = path.resolve(os.tmpdir(), 'mail_log.json')
        fs.appendFileSync(logFile, JSON.stringify({ to, success: false, error: error.message }) + '\n')
        console.error("Error sending email via Gmail API:", error)
        return { success: false, error }
    }
}
