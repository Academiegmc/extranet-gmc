const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/mongo-key");
const User = require("../models/User");
const Job = require("../models/Job");
const News = require("../models/News");
const Ad = require("../models/Ad");
const ErrorMessage = require("../config/error-messages");

const Users = {
  getAllUsers: async (req, res) => {
    const users = await User.find()
      .select("-password")
      .select("-admin");
    if (!users) res.status(400).json({ success: false });
    else res.status(200).json({ succes: true, data: users });
  },
  getUserJobs: async (req, res) => {
    const jobs = await Job.find({ user: req.params.id });
    if (!jobs) res.status(404).json({ success: false });
    else res.status(200).json({ success: true, data: jobs });
  },
  getUserAds: async (req, res) => {
    const ads = await Ad.find({ user: req.params.id });
    if (!ads) res.status(404).json({ success: false });
    else res.status(200).json({ success: true, data: ads });
  },
  getUserNews: async (req, res) => {
    const news = await News.find({ user: req.params.id });
    if (!news) res.status(404).json({ success: false });
    else res.status(200).json({ success: true, data: news });
  },
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
          expiresIn: 36000
        }
      );
      res.status(200).json({ auth: true, token: token });
    });
  }
};

module.exports = Users;
