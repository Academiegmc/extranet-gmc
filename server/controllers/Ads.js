const Ad = require("../models/Ad");
const User = require("../models/User");
const ErrorMessage = require("../config/error-messages");

const Ads = {
  getAllAds: async (req, res) => {
    const ads = await Ad.find().sort({ date: -1 });
    if (!ads) return res.status(404).json(err);
    let result = ads.map(async ad => await ad.getData());
    res.status(200).json(await Promise.all(result));
  },
  getAllUserAds: async (req, res) => {
    const ads = await Ad.find({ user: req.params.id }).sort({ date: -1 });
    if (!ads) return res.status(404).json(err);
    let result = ads.map(async ad => await ad.getData());
    res.status(200).json(await Promise.all(result));
  },
  getAd: async (req, res) => {
    const ad = await Ad.findById(req.params.id).populate({
      path: "comments.user",
      model: "gmc-users"
    });
    if (!ad) return res.status(404).json({ message: ErrorMessage.adNotFound });
    res.status(200).json(await ad.getData());
  },
  createAd: async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: ErrorMessage.serverError });
    const newAd = new Ad({
      user: user.id,
      title: req.body.title,
      description: req.body.description,
      category: req.body.category
    });
    await newAd.save();
    res.status(200).json(await newAd.getData());
  },
  updateCommentAd: async (req, res) => {
    const ad = await Ad.findById(req.params.id);
    if (!ad)
      return res.status(404).json({ success: false, message: "Not Found" });
    ad.comments.push(req.body);
    await ad.save();
    res.status(200).json({ success: true, data: ad });
  },
  updateAd: async (req, res) => {
    const ad = await Ad.findById(req.params.id);
    if (!ad)
      return res.status(404).json({ success: false, message: "NotFound" });
    if (req.body.title) ad.title = req.body.title;
    if (req.body.description) ad.description = req.body.description;
    if (req.body.category) ad.category = req.body.category;
    await ad.save();
    return res.status(200).json(await ad.getData());
  },
  deleteAd: async (req, res) => {
    await Ad.findByIdAndRemove(req.params.id);
    res.status(200).json({ success: true, message: ErrorMessage.adRemoved });
  },
  searchAds: async (req, res) => {
    const { q } = req.query;
    const ad = await Ad.find({
      title: { $regex: new RegExp(q), $options: "mi" }
    })
      .select("title")
      .limit(10);
    console.log(ad);
    res.status(200).json(ad);
  }
};

module.exports = Ads;
