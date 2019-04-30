const Ad = require("../models/Ad");
const User = require("../models/User");
const ErrorMessage = require("../config/error-messages");

const Ads = {
  getAllAds: async (req, res) => {
    try {
      const ads = await Ad.find().sort({ date: -1 });
      if (!ads) return res.status(404).json(err);
      let result = ads.map(async ad => await ad.getData());
      res.status(200).json(await Promise.all(result));
    } catch (error) {
      console.error(error);
    }
  },
  getAllUserAds: async (req, res) => {
    try {
      const ads = await Ad.find({ user: req.params.id }).sort({ date: -1 });
      if (!ads) return res.status(404).json(err);
      let result = ads.map(async ad => await ad.getData());
      res.status(200).json(await Promise.all(result));
    } catch (error) {
      console.error(error);
    }
  },
  getAd: async (req, res) => {
    try {
      const ad = await Ad.findById(req.params.id).populate({
        path: "comments.user",
        model: "gmc-users"
      });
      if (!ad)
        return res.status(404).json({ message: ErrorMessage.adNotFound });
      res.status(200).json(await ad.getData());
    } catch (error) {
      console.error(error);
    }
  },
  createAd: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user)
        return res
          .status(400)
          .json({ auth: false, message: ErrorMessage.serverError });
      const newAd = new Ad({
        user: user.id,
        name: user.name,
        title: req.body.title,
        description: req.body.description,
        category: req.body.category
      });
      await newAd.save();
      res.status(200).json(await newAd.getData());
    } catch (error) {
      console.log(error);
    }
  },
  updateCommentAd: async (req, res) => {
    try {
      const ad = await Ad.findById(req.params.id);
      if (!ad)
        return res.status(404).json({ success: false, message: "Not Found" });
      ad.comments.push(req.body);
      await ad.save();
      res.status(200).json({ success: true, data: ad });
    } catch (error) {
      console.error(error);
    }
  },
  updateAd: (req, res) => {
    Ad.findById(req.params.id)
      .then(ad => {
        if (ad) {
          Ad.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
          ).then(ad => res.json(ad));
        }
      })
      .catch(err =>
        res.status(404).json({ error: err, message: ErrorMessage.adNotFound })
      );
  },
  deleteAd: async (req, res) => {
    try {
      await Ad.findByIdAndRemove(req.params.id);
      res.status(200).json({ success: true, message: ErrorMessage.adRemoved });
    } catch (error) {
      console.log(error);
    }
  },
  searchAds: async (req, res) => {
    const { q } = req.query;
    try {
      const ad = await Ad.find({
        title: { $regex: new RegExp(q), $options: "mi" }
      })
        .select("title")
        .limit(10);
      console.log(ad);
      res.status(200).json(ad);
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = Ads;
