import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})

export const sendMail = async (to, subject, htmlContent) => {
    try {
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
            console.log(`\n=== [MAILER MOCK] ===\nTo: ${to}\nSubject: ${subject}\n=====================\n`)
            return { success: true, message: "Mock email sent (Missing SMTP Credentials)" }
        }

        const info = await transporter.sendMail({
            from: `"Library Management System" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html: htmlContent
        })

        return { success: true, messageId: info.messageId }
    } catch (error) {
        console.error("Error sending email:", error)
        return { success: false, error }
    }
}
