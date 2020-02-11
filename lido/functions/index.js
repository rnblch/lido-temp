/* eslint-disable consistent-return */
const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();
const nodemailer = require('nodemailer');
const doNotReplyEmail = encodeURIComponent(functions.config().gmail.email);
const doNotReplyPassword = encodeURIComponent(
  functions.config().gmail.password
);
const mailTransport = nodemailer.createTransport(
  `smtps://${doNotReplyEmail}:${doNotReplyPassword}@smtp.gmail.com`
);

exports.sendContactMessage = functions.firestore
  .document('messages/{pushKey}')
  .onCreate((snap, context) => {
    const snapshot = snap.data();
    const mailOptions = {
      from: `${doNotReplyEmail}`,
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

exports.scheduleTemperatureEmail = functions.pubsub
  .schedule('0 6 * * *')
  .timeZone('Europe/London')
  .onRun(context => {
    var db = admin.firestore();

    var usersRef = db.collection('users');
    return usersRef
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const message = `Hi ${doc.data().displayName},

This is your daily reminder to please log in at https://lidotemp.com and submit the temperature of your swimming venue to help Londoners plan their morning swim.
                      
Thank you for your help,
Your Lidotemp team`;

          const mailOptions = {
            from: `${doNotReplyEmail}`,
            to: `${doc.data().email}`,
            subject: `Reminder: Submit the temperature of your swimming venue today 🌡️💧`,
            text: message
          };
          return mailTransport.sendMail(mailOptions, error => {
            if (error) {
              console.log('Error: ' + error.message);
            }
            return;
          });
        });
        return;
      })
      .catch(err => {
        return console.log('Error getting documents: ', err);
      });
  });
