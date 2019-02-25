module.exports = {
  port: 5000,
  mail: {
    auth: { user: "test.mail@academie-gmc.com", pass: "testMail" },
    service: "gmail",
    secure: false,
    tls: {
      rejectUnauthorized: false
    },
    to: "quentin.kabasele@academie-gmc.com",
    subject: "Candidature",
    htmlFile: ""
  }
};
