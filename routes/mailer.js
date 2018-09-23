var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tramesh.1104@gmail.com',
    pass: 'imdbst@123'
  }
});

var mailOptions = {
  from: 'tramesh.1104@gmail.com',
  to: 'dchdeepak@gmil.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});