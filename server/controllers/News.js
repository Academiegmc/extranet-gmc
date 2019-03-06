const path = require("path");
const fs = require("fs");
const NewsModel = require("../models/News");
const User = require("../models/User");
const ErrorMessage = require("../config/error-messages");

const NewsController = {
  getAllNews: async (req, res) => {
    try {
      const news = await NewsModel.find().sort({ date: -1 });
      if (!news) return res.status(400).json(err);
      let result = news.map(async post => await post.getData());
      res.status(200).json(await Promise.all(result));
    } catch (error) {
      console.error(error);
    }
  },
  getNews: async (req, res) => {
    try {
      const news = await NewsModel.findById({ _id: req.params.id });
      if (!news)
        return res
          .status(404)
          .json({ success: false, message: ErrorMessage.newsNotFound });
      res.status(200).json(await news.getData());
    } catch (error) {
      console.error(error);
    }
  },
  createNews: async (req, res) => {
    try {
      let imgTab = [];
      req.files.forEach(file => imgTab.push(file.filename));
      const user = await User.findOne({ _id: req.user.id }, { password: 0 });
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: ErrorMessage.userNotFound });
      }
      const newNews = new NewsModel({
        name: user.name,
        user: user._id,
        title: req.body.title,
        description: req.body.description,
        images: imgTab
      });
      await newNews.save();
      res.status(200).json(await newNews.getData());
    } catch (error) {
      console.error(error);
    }
  },
  updateNews: (req, res) => {
    const { title, description } = req.body;
    let imgTab = [];
    req.files.forEach(file => imgTab.push(file.filename));
    NewsModel.findById(req.params.id)
      .then(news => {
        news.title = title;
        news.description = description;
        imgTab.forEach(img => news.images.push(img));
        news
          .save()
          .then(newsSaved => res.status(200).json(newsSaved))
          .catch(error => res.status(400).json(error.response));
      })
      .catch(err => {
        res.status(400).json(err.response);
      });
  },
  deleteNews: (req, res) => {
    NewsModel.findOneAndRemove({ _id: req.params.id }).then(news => {
      news.images.map(img => {
        fs.unlink(`${path.join(__dirname, "../")}public/images/${img}`, err => {
          if (err) res.status(400).json(err.response);
        });
      });
      res
        .status(200)
        .json({ success: true, message: ErrorMessage.newsRemoved });
    });
  }
};

module.exports = NewsController;
