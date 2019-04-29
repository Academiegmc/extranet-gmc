const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const config = require("../config/mongo-key");
const User = require("../models/User");
const Job = require("../models/Job");
const News = require("../models/News");
const Ad = require("../models/Ad");
const ErrorMessage = require("../config/error-messages");
const utils = require("../config/utils");
const Users = {
  getAllUsers: async (req, res) => {
    const users = await User.find()
      .select("-password")
      .select("-admin");
    if (!users) res.status(400).json({ success: false });
    else {
      let result;
      try {
        result = users.map(async user => await user.getProfileInfos());
        res.status(200).json({ succes: true, data: await Promise.all(result) });
      } catch (error) {
        console.error(error);
      }
    }
  },
  getUser: async (req, res) => {
    const user = await User.findById(req.params.id)
      .select("-password")
      .select("-admin")
      .populate("convention")
      .populate("personal_sheet");
    if (!user) res.status(400).json({ success: false });
    else {
      res
        .status(200)
        .json({ succes: true, user: await user.getProfileInfos() });
    }
  },
  getUserJobs: async (req, res) => {
    try {
      const jobs = await Job.find({ user: req.params.id });
      if (!jobs) res.status(404).json({ success: false });
      else res.status(200).json({ success: true, data: jobs });
    } catch (error) {
      console.error(error);
    }
  },
  getUserAds: async (req, res) => {
    try {
      const ads = await Ad.find({ user: req.params.id });
      if (!ads) res.status(404).json({ success: false });
      else res.status(200).json({ success: true, data: ads });
    } catch (error) {
      console.error(error);
    }
  },
  getUserNews: async (req, res) => {
    try {
      const news = await News.find({ user: req.params.id });
      if (!news) res.status(404).json({ success: false });
      else res.status(200).json({ success: true, data: news });
    } catch (error) {
      console.error(error);
    }
  },
  create: async (req, res) => {
    try {
      let { name, email, password, status } = req.body;
      const passwordToSend = password;
      const salt = 10;
      const user = await User.findOne({ email });
      if (user)
        return res
          .status(400)
          .json({ success: false, message: "User already exists" });
      password = await bcrypt.hash(password, salt);
      const newUser = new User({ name, email, password, status, admin: true });
      console.log(newUser);
      await newUser.save();
      utils.sendRegisterMail(email, passwordToSend);
      res.status(201).json({ success: true, user: newUser });
    } catch (error) {
      console.error(error);
    }
  },
  update: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const salt = 10;
      if (!user) return res.status(404).send(ErrorMessage.userNotFound);
      // if (
      //   req.files.profile_pic !== undefined &&
      //   req.files.profile_pic.length > 0
      // ) {
      //   user.profile_pic = req.files.profile_pic[0].filename.trim();
      // }
      if (
        req.files.convention !== undefined &&
        req.files.convention.length > 0
      ) {
        user.convention = req.files.convention[0].id;
      }
      if (
        req.files.renseignement !== undefined &&
        req.files.renseignement.length > 0
      ) {
        user.personal_sheet = req.files.renseignement[0].id;
      }
      // if (
      //   req.files.recommandation !== undefined &&
      //   req.files.recommandation.length > 0
      // ) {
      //   req.files.recommandation.map(letter =>
      //     user.letters.push(letter.filename)
      //   );
      // }
      // if (
      //   req.body.old_password &&
      //   req.body.new_password &&
      //   req.body.confirm_password
      // ) {
      //   if (req.body.new_password !== req.body.confirm_password) {
      //     return res.status(400).json({ error: "Mot de passe incorrect" });
      //   }
      //   const check_password = await bcrypt.compare(
      //     req.body.old_password,
      //     user.password
      //   );
      //   console.log(check_password);
      //   if (check_password) {
      //     user.password = await bcrypt.hash(req.body.new_password, salt);
      //   } else {
      //     res.status(400).json({ error: "Mot de passe incorrect" });
      //   }
      // }
      // if (
      //   req.body.name !== "" &&
      //   req.body.description !== "" &&
      //   req.body.poste !== "" &&
      //   req.body.start_date !== "" &&
      //   req.body.end_date !== ""
      // ) {
      //   const { name, description, poste, start_date, end_date } = req.body;
      //   const experience = { name, description, poste, start_date, end_date };
      //   user.experiences.push(experience);
      // }
      // console.log(req.user);
      // console.log(req.files);
      // res.json(req.files);
      const userSaved = await user.save();
      if (!userSaved) return res.status(400).json({ success: false });
      res.status(200).json({ success: true, user: await userSaved.getInfos() });
    } catch (error) {
      console.error(error);
      res.status(400).json({ success: false, error });
    }
  },
  delete: async (req, res) => {
    try {
      const user = await User.findByIdAndRemove(req.params.id);
      if (!user) return res.status(404).send(ErrorMessage.userNotFound);
      res.status(200).json({ success: true, message: "Compte supprimé !" });
    } catch (error) {
      res.status(400).json({ success: false });
    }
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
          profile_pic: user.profile_pic,
          email: user.email,
          status: user.status,
          admin: user.admin
        },
        config.secretOrKeys,
        {
          expiresIn: 36000
        }
      );
      res.status(200).json({ auth: true, token });
    });
  }
};

module.exports = Users;
