const path = require("path");

const NewsModel = require("../models/News");
const User = require("../models/User");
const ErrorMessage = require("../config/error-messages");

const NewsController = {
  getAllNews: (req, res) => {
    NewsModel.find()
      .sort({ date: -1 })
      .then(news => res.status(200).json(news))
      .catch(err => res.status(400).json(err));
  },
  getNews: (req, res) => {
    NewsModel.findById({ _id: req.params.id }, (err, news) => {
      if (err) {
        res.status(500).json(err);
      }
      if (!news) {
        return res
          .status(404)
          .json({ auth: false, message: ErrorMessage.newsNotFound });
      }
      res.status(200).json(news);
    });
  },
  createNews: (req, res) => {
    // let { images } = req.files;
    let imgTab = [];
    req.files.forEach(file => imgTab.push(file.filename));
    User.findOne({ _id: req.user.id }, { password: 0 }, (err, user) => {
      if (err) {
        res.status(500).json(err);
      }
      if (!user) {
        return res
          .status(404)
          .json({ auth: false, message: ErrorMessage.userNotFound });
      }
      const newNews = new NewsModel({
        name: user.name,
        user: user._id,
        title: req.body.title,
        description: req.body.description,
        images: imgTab
      });
      newNews
        .save()
        .then(news => res.status(200).json(news))
        .catch(err => res.status(400).json(err));
    });
  },
  updateNews: (req, res) => {
    NewsModel.findById(req.params.id)
      .then(news => {
        if (news) {
          NewsModel.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
          ).then(news => res.status(200).json(news));
        }
      })
      .catch(err => res.status(400).json(err));
  },
  deleteNews: (req, res) => {
    NewsModel.findOneAndRemove({ _id: req.params.id }).then(news =>
      res.status(200).json({ success: true, message: ErrorMessage.newsRemoved })
    );
  }
};

module.exports = NewsController;
