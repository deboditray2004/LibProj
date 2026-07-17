import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'
import os from 'os'
import dns from 'dns'

dns.setDefaultResultOrder('ipv4first')

let transporter = null

export const sendMail = async (to, subject, htmlContent, replyTo = null) => {
    try {
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
            console.log(`\n=== [MAILER MOCK] ===\nTo: ${to}\nSubject: ${subject}\n=====================\n`)
            return { success: true, message: "Mock email sent (Missing SMTP Credentials)" }
        }

        if (!transporter) {
            const port = parseInt(process.env.SMTP_PORT || '587', 10)
            const targetHost = process.env.SMTP_HOST || 'smtp.gmail.com'
            
            // Manually resolve to IPv4 to bypass any IPv6 routing bugs in Node 18+ or Nodemailer
            const resolvedIp = await new Promise((resolve, reject) => {
                dns.lookup(targetHost, { family: 4 }, (err, address) => {
                    if (err) reject(err)
                    else resolve(address)
                })
            })

            transporter = nodemailer.createTransport({
                host: resolvedIp,
                port: port,
                secure: port === 465, 
                tls: {
                    servername: targetHost
                },
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                },
                connectionTimeout: 10000, 
                greetingTimeout: 10000,
                socketTimeout: 15000 
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
