## One Time Password Server

### Description

The purpose of this application is to generated One Time Passwords based on user email.

Application was build with: Express, Sequelize, email-validator, nodemailer, mysql2.

Check also the UI project [One Time Password UI](https://github.com/ingrid0404/otp-fe)

## Installation and Setup Instructions

### Installation:
1. Make sure to have node and npm installed
2. Make sure to have MySql installed
4. Download source code
5. Edit file `connection.js` in order to conenct to a db
6. Edit file `emailService/utils.js` with an email address that will be used as a SMTP server
7. Run `npm install` to install all the dependencies
8. Run `npm start` to start the application


### Usage:

Use an API testing tool, for example Postman or Insomnia

`api1/v1/email/otp`

![image](https://github.com/ingrid0404/otp_server/assets/113686835/3189b31e-5e0e-4649-8845-dbe40de7eeeb)



