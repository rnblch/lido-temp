/* eslint-disable consistent-return */
const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(
  smtpTransport({
    service: 'gmail',
    auth: {
      user: `${gmailEmail}`,
      pass: `${gmailPassword}`
    }
  })
);

exports.sendContactMessage = functions.database
  .ref('/messages/{pushKey}')
  .onWrite(event => {
    const snapshot = event.data;
    if (snapshot.previous.val() || !snapshot.val().name) {
      return;
    }

    const val = snapshot.val();

    const mailOptions = {
      from: `${gmailEmail}`,
      to: 'donotreply@lidotemp.com',
      subject: `You've been contacted by ${val.name} ✨`,
      text: `${val.message}`
    };
    return mailTransport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error occurred');
        console.log(error.message);
        return process.exit(1);
      }
    });
  });
