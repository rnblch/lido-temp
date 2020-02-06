/* eslint-disable consistent-return */
const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();
const nodemailer = require('nodemailer');
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(
  `smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`
);

exports.sendContactMessage = functions.firestore
  .document('messages/{pushKey}')
  .onCreate((snap, context) => {
    const snapshot = snap.data();
    const mailOptions = {
      from: `${gmailEmail}`,
      to: 'donotreply@lidotemp.com',
      subject: `You've been contacted by ${snapshot.formData.name} ✨`,
      html: `${snapshot.formData.html}`
    };
    return mailTransport.sendMail(mailOptions, error => {
      if (error) {
        console.log('Error: ' + error.message);
      }
      return;
    });
  });
