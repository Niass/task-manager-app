const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'ibrahima.niass.ch@gmail.fr',
    subject: 'Thanks for joining in!',
    text: `Welcome to the app, ${name}. Let me know if I can help!`
  });
};

const sendGoodByeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'ibrahima.niass.ch@gmail.fr',
    subject: 'Stay with us!',
    text: `We already miss you, ${name}. Why are you leaving us?`
  });
};

module.exports = {
  sendWelcomeEmail,
  sendGoodByeEmail
};
