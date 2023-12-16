const {validateEmail, isDateExpired, generateOTPInstance} = require('../../routes/utils');


  describe('Validate email tests', function () {
    
    const invalidEmail = "djfgh";
    const validEmail = "ion.popescu@provider.com";
    it('Invalid email', function () {
        expect(validateEmail(invalidEmail)).toEqual(false);
    });
    it('Valid email', function () {
        expect(validateEmail(validEmail)).toEqual(true);
      });
  });

  describe('Date tests', function () {
    const dateValue1 = new Date();
    const dateValue2 = new Date();
    dateValue2.setMinutes( dateValue1.getMinutes() + 30);

    it('Expired date', function () {
        expect(isDateExpired(dateValue1, dateValue2)).toEqual(false);
    });
    it('Not expired date', function () {
        expect(isDateExpired(dateValue2, dateValue1)).toEqual(true);
      });
  });

  
  describe('OTP instance tests', function () {
    it('Expired date', function () {
        const generatedOTPInstance = generateOTPInstance();
        expect(generatedOTPInstance.otpValue.length).toEqual(5);
        expect(isDateExpired(generatedOTPInstance.actualDate, generatedOTPInstance.expirationTime)).toEqual(false);
    });
  });
