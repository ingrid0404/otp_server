const {OTP} = require('../connection');

const checkIfAlreadyExistsByEmail = async (email) => {
    const foundByEmail = await OTP.findOne({where: {email: email}});
    return foundByEmail;
}

const createOrUpdatebyEmail = async (email, otp, actualDate, expirationTime) => {
    const foundByEmail = await checkIfAlreadyExistsByEmail(email);
   
    let otpInstance;
    if(foundByEmail === null) {
        otpInstance = await OTP.create({
            email: email,
            otp: otp,
            expiration_time: expirationTime,
            verified: 0
        }).catch((error) => {
            console.error(error);
          });
        
    } else {
        await OTP.update({
            otp: otp,
            updated_at: actualDate,
            expiration_time: expirationTime,
            verified: 0
        },
        {where:{id:foundByEmail.id}}).catch((error) => {
            console.error(error);
          });
          otpInstance =  await OTP.findOne({where: {email: email}});

    }
    return otpInstance?.otp;
}

const findOTPById = async (otp, email) => {
    const otpInstance = await OTP.findOne({where:{otp: otp, email: email}});
    return otpInstance;
}

const updateOTPbyId = async (otp, email) => {
    let statusCode = 200;
    let message = {"success": true};
    await OTP.update({
        verified: true
    },{
        where:{otp:otp, email: email}
    }).catch((err)=>{
        statusCode = 400;
        message= 'error';
    });

    return {statusCode, message};
}

module.exports = {createOrUpdatebyEmail, findOTPById, updateOTPbyId}