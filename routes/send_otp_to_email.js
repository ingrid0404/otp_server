const router = require('express').Router();

const {generateOTPInstance, validateEmail} = require('../routes/utils');
const {createOrUpdatebyEmail} = require('../service/OTP_service');
const sendEmail = require('../emailService/utils');

router.post('/email/otp', async (req, res, next) => {
    try {
        const {email} = req.body;

        if(!email) {
            return res.status(400).send({'error':'Undefined email'});
        }

        if(validateEmail(email) === false) {
            return res.status(400).send({'error':'Invalid email address'});
        }
        
        const generatedOTPInstance = generateOTPInstance();

        let createdOTPInstance;

        try{
            await createOrUpdatebyEmail(email, generatedOTPInstance.otpValue, generatedOTPInstance.actualDate, generatedOTPInstance.expirationTime)
            .then((result)=>{
                createdOTPInstance = result;
            }).catch((error) => {
                console.error(error);
                return res.status(400).send({'error':'error'});
              });
        } catch(err) {
            console.log(err);
            return res.status(400).send({'error':'error'});
        }
       

        let result;
        try{
         result = await sendEmail(createdOTPInstance, email);
         return res.status(result.statusCode).send(result.message);
        } catch(err) {
            return res.status(400).send({'error':'error'});
        }

    } catch(err) {
        return res.status(400).send({'error':'error'});
    }
});

module.exports = router;