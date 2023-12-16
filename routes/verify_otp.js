const router = require('express').Router();
const {isDateExpired} = require('./utils');
const { findOTPById, updateOTPbyId } = require('../service/OTP_service');

router.post('/verify/otp', async (req, res, next) => {
    try {
        const currentDate = new Date(); 
        const {otp, email} = req.body;

        if(!otp || !email) {
            return res.status(400).send({'error':'Undefined value'});
        }

        try {
            const otpInstance = await findOTPById(otp, email);

            if(otpInstance === null) {
                return res.status(400).send({'error':'Invalid'});
            }

            if(isDateExpired(currentDate, otpInstance.expiration_time)) {
                    return res.status(400).send({'error':'expired'});
                }

            if(otpInstance.verified) {
                return res.status(400).send({'error':'already verified'});
            }
           
            const result = await updateOTPbyId(otp, email);
            return res.status(result.statusCode).send(result.message);
            
        } catch(err) {
            return res.status(400).send({'error':'error'});
        }

    } catch(err) {
        return res.status(400).send({'error':'error'});
    }
});

module.exports = router;