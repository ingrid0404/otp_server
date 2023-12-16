const Sequelize = require('sequelize');

const otpModel = require('./models/OTP');

const sequelize = new Sequelize(
    'BT_CODING_CHALLENGE',
    'newuser',
    'Test123.Test123.', 
    {
    host: 'localhost',
    dialect:  'mysql',
    protocol: 'mysql',
    define: {
      timestamps: false
    },
    pool: {
        max: 20,
        min: 0,
        idle: 5000
    },
    logging:false
  });
  
const OTP = otpModel(sequelize, Sequelize);
  
sequelize.sync().then(() => {
    console.log('db and tables have been created');
}).catch((error) => {
    console.error('Unable to create table : ', error);
  });

module.exports = {OTP};