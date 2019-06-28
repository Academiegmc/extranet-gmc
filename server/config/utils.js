const nodemailer = require("nodemailer");
const {
  NODEMAILER_USER_EMAIL,
  NODEMAILER_USER_PASSWORD,
  NODEMAILER_SERVICE,
  NODEMAILER_SECURE,
  NODEMAILER_TLS
} = process.env;
const transport = nodemailer.createTransport({
  service: NODEMAILER_SERVICE,
  secure: NODEMAILER_SECURE,
  auth: { user: NODEMAILER_USER_EMAIL, pass: NODEMAILER_USER_PASSWORD },
  tls: {
    rejectUnauthorized: NODEMAILER_TLS
  }
});

module.exports = {
  arraySplit: ",",
  sendRegisterMail: (email, password) => {
    console.log(`IDs: ${email} | ${password}`);
    const mailOptions = {
      from: NODEMAILER_USER_EMAIL,
      to: email,
      subject: "Extranet-AGMC: Merci de vous être inscrits",
      text: `Voici votre mot de passe : ${password}. Vous pouvez dès à présent accéder à l'extranet à l'adresse suivante ${
        process.env.REACT_APP_EXTRANET
      }`
    };
    transport.sendMail(mailOptions, (error, info) => {
      if (error) console.error(error);
      else console.log(`Email sent to ${info.response}`);
    });
  }
};
