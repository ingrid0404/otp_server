const nodemailer = require('nodemailer');

const createTransporter = () => {
     return nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
                user: 'custom@gmail.com',
                pass: 'jciu suim noey curg',
            },
        secure: true,
        tls: {
            rejectUnauthorized: false
          }
    });
};

const createDetails = () => {
    const now = new Date();
    const details={
        "timestamp": now, 
        "success": true,
        "message":"OTP sent to user"
      };
      return details;
};

const computeEmailMessage = (otp) =>  `Dear User, \n\n` 
                + 'OTP for Login is : \n\n'
                + `${otp}\n\n`
                + 'This OTP is valid for 30s \n\n'
                + 'This is a auto-generated email. Please do not reply to this email.\n\n';


const sendEmail = async (otpInstance, email) => {
    let statusCode, message;
    if(!otpInstance) {
        statusCode = 400;
        message = 'Could not send email';
        return {statusCode, message};
    }
    const emailMessage = computeEmailMessage(otpInstance);
    const emailOptions = {
        from: 'BT Coding Challenge generator',
        to: `${email}`,
        subject: 'BT Coding Challenge generator',
        text: emailMessage ,
      };

    const transporter = createTransporter();
    const details = createDetails();
    const encodedMessage = JSON.stringify(details);

    statusCode = 200;
    message = encodedMessage;
    
    try{
        const info = await transporter.sendMail(emailOptions);
        console.log(info);
    } catch(err) {
        statusCode = 400;
        message = {'error':'error'};
    }
    
    return {statusCode, message};
};

module.exports = sendEmail;
