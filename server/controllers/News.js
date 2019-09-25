const path = require("path");
const fs = require("fs");
const NewsModel = require("../models/News");
const User = require("../models/User");
const ErrorMessage = require("../config/error-messages");

const NewsController = {
  getAllNews: async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;

    //Get total pages
    const count = await NewsModel.countDocuments();
    const totalPages = Math.ceil(count / limit);

    const news = await NewsModel.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ date: -1 })
      .populate({
        path: "comments.user",
        model: "gmc-users"
      });
    if (!news) return res.status(400).json(err);
    let result = news.map(async post => await post.getData());
    res.status(200).json({ news: await Promise.all(result), totalPages });
  },
  getAllUserNews: async (req, res) => {
    const news = await NewsModel.find({ user: req.params.id })
      .populate({
        path: "comments.user",
        model: "gmc-users"
      })
      .sort({
        date: -1
      });
    if (!news) return res.status(404).json(err);
    let result = news.map(async post => await post.getData());
    res.status(200).json(await Promise.all(result));
  },
  getNews: async (req, res) => {
    const news = await NewsModel.findById({ _id: req.params.id }).populate({
      path: "comments.user",
      model: "gmc-users"
    });
    if (!news)
      return res
        .status(404)
        .json({ success: false, message: ErrorMessage.newsNotFound });
    res.status(200).json(await news.getData());
  },
  createNews: async (req, res) => {
    let imgTab = [];
    if (req.files != undefined && req.files.length > 0)
      req.files.forEach(file => imgTab.push(file.id));
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
    const newsSaved = await newNews.save();
    res.status(200).json(await newsSaved.getData());
  },
  updateCommentNews: async (req, res) => {
    const news = await NewsModel.findById(req.params.id);
    if (!news)
      return res.status(404).json({ success: false, message: "Not Found" });
    news.comments.push(req.body);
    if (req.files === undefined) news.images = news.images;
    await news.save();
    const updatedNews = await NewsModel.find()
      .sort({ date: -1 })
      .populate({
        path: "comments.user",
        model: "gmc-users"
      });
    if (!updatedNews)
      return res.status(404).json({ success: false, message: "Not Found" });
    let result = updatedNews.map(async post => await post.getData());
    res.status(200).json(await Promise.all(result));
  },
  updateNews: async (req, res) => {
    const { title, description } = req.body;
    let imgTab = [];
    req.files.forEach(file => imgTab.push(file.filename));
    const news = await NewsModel.findById(req.params.id);
    if (!news) res.status(404).json({ success: false });
    news.title = title;
    news.description = description;
    imgTab.forEach(img => news.images.push(img));
    const newsUpdated = await news.save();
    res.status(200).json(newsUpdated.getData());
  },
  deleteNews: async (req, res) => {
    const news = await NewsModel.findOneAndRemove({ _id: req.params.id });
    if (!news) res.status(404).json({ success: false });
    news.images.map(async img => {
      await fs.unlink(`${path.join(__dirname, "../")}public/images/${img}`);
    });
    res.status(200).json({ success: true, message: ErrorMessage.newsRemoved });
  }
};

module.exports = NewsController;
