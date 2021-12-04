const nodemailer = require('nodemailer');

const sendEmail = async (email) => {

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'dawson.breitenberg1@ethereal.email',
        pass: 'BVkDzybWqjjC6V91dn'
    }
});

var mailOptions = {
  from: 'dawson.breitenberg1@ethereal.email',
  to: email,
  subject: 'Sending Email using Node.js',
  text: `Hi Welcome to the Webiste ${email}`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
    console.log('Link: ' + nodemailer.getTestMessageUrl(info));
  }
});
}

module.exports = sendEmail;