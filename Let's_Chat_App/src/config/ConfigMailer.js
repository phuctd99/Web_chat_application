import nodeMailer from "nodemailer";

let adminEmail = process.env.MAIL_USER;

let adminPassword = process.env.MAIL_PASSWORD;

let host = process.env.MAIL_HOST;
let port = process.env.MAIL_PORT;

let sendMail = (to, subject, htmlContent) => {
    let transporter = nodeMailer.createTransport({
        host: host,
        port: port,
        secure: false,
        service: 'gmail',
        auth: {
            user: adminEmail,
            pass: adminPassword
        }
    });
    let options = {
        from: adminEmail,
        to: to,
        subject: subject,
        html: htmlContent
    };
    return transporter.sendMail(options); // this default return a promise
};

module.exports = sendMail;