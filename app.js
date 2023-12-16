const express = require('express');
var cors = require('cors');
var corsOption = {
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};
const bodyParser = require('body-parser');
const app = express();
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const sentOTPToEmail = require('./routes/send_otp_to_email');
const verifyOTP = require('./routes/verify_otp');

app.use('/api/v1/', sentOTPToEmail);
app.use('/api/v1', verifyOTP);

app.get('/', (req, res) => {
    console.log(' route / is accesed');
    res.send('Hello');
});

const port = 5000;

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
})

module.export = app;
