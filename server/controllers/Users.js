const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/mongo-key");
const User = require("../models/User");
const ErrorMessage = require("../config/error-messages");

const Users = {
  login: (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) return res.status(500).send(ErrorMessage.serverError);
      if (!user) return res.status(401).send(ErrorMessage.userNotFound);

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).json({ auth: false, token: null });
      }
      const token = jwt.sign(
        {
          id: user._id,
          name: user.name,
          email: user.email,
          status: user.status,
          admin: user.admin
        },
        config.secretOrKeys,
        {
          expiresIn: 3600
        }
      );
      res.status(200).json({ auth: true, token: token });
    });
  }
};

module.exports = Users;
