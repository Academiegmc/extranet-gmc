const {
  NODEMAILER_USER_EMAIL,
  NODEMAILER_USER_PASSWORD,
  NODEMAILER_SERVICE,
  NODEMAILER_SECURE,
  NODEMAILER_TLS
} = process.env;
module.exports = {
  port: 5000,
  mail: {
    auth: { user: NODEMAILER_USER_EMAIL, pass: NODEMAILER_USER_PASSWORD },
    service: NODEMAILER_SERVICE,
    secure: NODEMAILER_SECURE,
    tls: {
      rejectUnauthorized: NODEMAILER_TLS
    },
    to: "quentin.kabasele@academie-gmc.com",
    subject: "Candidature",
    htmlFile: ""
  }
};
