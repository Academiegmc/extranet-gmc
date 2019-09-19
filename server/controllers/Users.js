const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/mongo-key");
const User = require("../models/User");
const Job = require("../models/Job");
const News = require("../models/News");
const Ad = require("../models/Ad");
const Letter = require("../models/Letter");
const UserFiles = require("../models/User-GFS");
const ErrorMessage = require("../config/error-messages");
const utils = require("../config/utils");
const { deleteGridFSBucket } = require("../services/gridFSMulter");
const Users = {
  getAllUsers: async (req, res) => {
    const users = await User.find()
      .select("-password")
      .select("-admin");
    if (!users) return res.status(400).json({ success: false });
    let result;
    result = users.map(async user => await user.getProfileInfos());
    res.status(200).json({ succes: true, data: await Promise.all(result) });
  },
  getUser: async (req, res) => {
    const user = await User.findById(req.params.id)
      .select("-password")
      .select("-admin")
      .populate("profile_pic")
      .populate("convention")
      .populate("letters")
      .populate("personal_sheet");
    if (!user) res.status(400).json({ success: false });
    else {
      res.status(200).json(await user.getProfileInfos());
    }
  },
  getUserJobs: async (req, res) => {
    const jobs = await Job.find({ user: req.params.id });
    if (!jobs) res.status(404).json({ success: false });
    else {
      let result;
      result = jobs.map(async job => await job.getData());
      res.status(200).json(await Promise.all(result));
    }
  },
  getUserAds: async (req, res) => {
    const ads = await Ad.find({ user: req.params.id }).sort({ date: -1 });
    if (!ads) res.status(404).json({ success: false });
    else {
      let result;
      result = ads.map(async ad => await ad.getData());
      res.status(200).json(await Promise.all(result));
    }
  },
  getUserNews: async (req, res) => {
    const newsTab = await News.find({ user: req.params.id });
    if (!newsTab) res.status(404).json({ success: false });
    else {
      let result;
      result = newsTab.map(async news => await news.getData());
      res.status(200).json(await Promise.all(result));
    }
  },
  create: async (req, res) => {
    let { name, email, password, status } = req.body;
    const passwordToSend = password;
    const salt = 10;
    const user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    password = await bcrypt.hash(password, salt);
    const newUser = new User({ name, email, password, status, admin: false });
    await newUser.save();
    utils.sendRegisterMail(email, passwordToSend);
    res.status(201).json({ status: "success", user: newUser });
  },
  update: async (req, res) => {
    const user = await User.findById(req.user.id);
    const salt = process.env.SALT || 10;
    if (!user) return res.status(404).send(ErrorMessage.userNotFound);
    if (
      req.files.profile_pic !== undefined &&
      req.files.profile_pic.length > 0
    ) {
      if (user.profile_pic !== undefined) {
        console.log("Profile:", user.profile_pic);
        await deleteFile(user.profile_pic, UserFiles);
      }
      user.profile_pic = req.files.profile_pic[0].id;
    }
    if (req.files.convention !== undefined && req.files.convention.length > 0) {
      user.convention = req.files.convention[0].id;
    }
    if (
      req.files.renseignement !== undefined &&
      req.files.renseignement.length > 0
    ) {
      user.personal_sheet = req.files.renseignement[0].id;
    }
    if (req.body.lettre_recommandation !== "" && req.body.author !== "") {
      const letter = new Letter({
        author: req.body.author,
        text: req.body.recommandation
      });
      console.log(letter);
      await letter.save();
      user.letters.push(letter._id);
    }
    if (req.body.old_password !== "" && req.body.new_password !== "") {
      const isMatch = await bcrypt.compare(
        req.body.old_password,
        user.password
      );
      if (isMatch)
        user.password = await bcrypt.hash(req.body.new_password, salt);
      console.log({ isMatch });
    }
    console.log({ user });
    const userSaved = await user.save();
    if (!userSaved) return res.status(400).json({ success: false });
    res
      .status(200)
      .json({ user: await userSaved.getInfos(), status: "success" });
  },
  delete: async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) return res.status(404).send(ErrorMessage.userNotFound);
    res.status(200).json({ success: true, message: "Compte supprimé !" });
  },
  deleteUserJobs: async (req, res) => {
    console.log("Deleting user job....");
    const job = await Job.findOne({ user: req.params.id });
    if (!job) res.status(404).json({ success: false });
    else {
      await job.remove();
      res.status(200).json({ message: "job supprimé !", status: "success" });
    }
  },
  deleteUserAds: async (req, res) => {
    console.log("Deleting user ad....");
    const { gfs } = req.gridFSMulter;
    const ad = await Ad.findById(req.params.id);
    if (!ad) res.status(404).json({ success: false });
    else {
      if (ad.images.length > 0) {
        ad.images.map(async image => {
          await deleteGridFSBucket(
            gfs,
            gfs.s._chunksCollection,
            gfs.s._filesCollection,
            image
          );
        });
      }
      await ad.remove();
      res.status(200).json({
        success: true,
        status: "success"
      });
    }
  },
  deleteUserNews: async (req, res) => {
    console.log("Deleting user ad....");
    const { gfs } = req.gridFSMulter;
    const news = await News.findById(req.params.id);
    if (!news) res.status(404).json({ success: false });
    else {
      if (news.images.length > 0) {
        news.images.map(async image => {
          await deleteGridFSBucket(
            gfs,
            gfs.s._chunksCollection,
            gfs.s._filesCollection,
            image
          );
        });
      }
      await news.remove();
      res.status(200).json({ message: "News supprimée !", status: "success" });
    }
  },
  login: async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
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
  }
};

const deleteFile = async (fileId, model) => {
  const file = await model.findOne({ _id: fileId });
  if (!file) return res.status(404).send({ message: "File not found" });
  console.log(file);
  await file.remove();
};
module.exports = Users;
