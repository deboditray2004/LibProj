import nodemailer from 'nodemailer';

async function test() {
    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'libraryproj.mgmt@gmail.com',
                pass: 'jiymgsnfqfruzihs'
            },
            family: 4,
            connectionTimeout: 10000, 
            greetingTimeout: 10000,
            socketTimeout: 15000 
        });

        const info = await transporter.sendMail({
            from: 'libraryproj.mgmt@gmail.com',
            to: 'libraryproj.mgmt@gmail.com',
            subject: 'Test Email',
            text: 'Testing SMTP connection'
        });
        console.log('Success:', info.messageId);
    } catch (err) {
        console.error('Error:', err.message);
    }
}
test();
