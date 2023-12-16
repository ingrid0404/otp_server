const otpGenerator = require('otp-generator');
const emailValidator = require("email-validator");

const addSecondsToDate = (actualDate, secondstoAdd) => {
    actualDate = actualDate.getTime()+secondstoAdd*1000;
    const toReturn = new Date(actualDate);
    return toReturn;
}

const generateOTPInstance = () => {
    const otpValue = otpGenerator.generate(5, { upperCaseAlphabets: false, specialChars: false });
    const actualDate = new Date();
    const expirationTime = addSecondsToDate(actualDate, 30);
    return {otpValue, expirationTime, actualDate};
};

const isDateExpired = (actualDate, expirationDate) => {
    const actualDateMilis = actualDate.getTime();
    const expirationDateMilis = expirationDate.getTime();
    if(actualDateMilis > expirationDateMilis) {
        return true;
    }
    return false;
}

const validateEmail = (email) => {
    return emailValidator.validate(email);
}


module.exports = {validateEmail, generateOTPInstance, isDateExpired, addSecondsToDate}