const Ad = require("../models/Ad");
const User = require("../models/User");
const ErrorMessage = require("../config/error-messages");
const { deleteGridFSBucket } = require("../services/gridFSMulter");

const Ads = {
  getAllAds: async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    //Get total pages
    const count = await Ad.count();
    const totalPages = Math.ceil(count / limit);
    console.log("====================================");
    console.log(totalPages);
    console.log("====================================");
    const ads = await Ad.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ date: -1 });
    if (!ads) return res.status(404).json(err);
    let result = ads.map(async ad => await ad.getData());
    res.status(200).json({ ads: await Promise.all(result), totalPages });
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
    console.log("files", req.files);
    let imgTab = [];
    if (req.files !== undefined)
      req.files.forEach(file => imgTab.push(file.id));
    const user = await User.findById(req.user.id);
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: ErrorMessage.serverError });
    const newAd = new Ad({
      user: user.id,
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      images: imgTab
    });
    await newAd.save();
    res.status(200).json({ ad: await newAd.getData(), status: "success" });
  },
  updateCommentAd: async (req, res) => {
    const ad = await Ad.findById(req.params.id).populate({
      path: "comments.user",
      model: "gmc-users"
    });
    if (!ad)
      return res.status(404).json({ success: false, message: "Not Found" });
    ad.comments.push(req.body);
    await ad.save();
    const updatedAd = await Ad.findById(req.params.id).populate({
      path: "comments.user",
      model: "gmc-users"
    });
    res.status(200).json({ ad: await updatedAd.getData(), status: "success" });
  },
  updateAd: async (req, res) => {
    const ad = await Ad.findById(req.params.id).populate({
      path: "comments.user",
      model: "gmc-users"
    });
    if (!ad)
      return res.status(404).json({ success: false, message: "NotFound" });
    if (req.body.title) ad.title = req.body.title;
    if (req.body.description) ad.description = req.body.description;
    if (req.body.category) ad.category = req.body.category;
    if (req.files !== undefined) {
      let imgTab = [];
      req.files.forEach(file => imgTab.push(file.id));
      ad.images.map(image => {
        gfs.remove({ _id: image._id }, async (err, gridStore) => {
          if (err) return res.status(400).json({ err: "Bad Request" });
          console.log("success");
        });
      });
      ad.images = imgTab;
    }
    await ad.save();
    const updatedAd = await Ad.findById(req.params.id).populate({
      path: "comments.user",
      model: "gmc-users"
    });
    return res
      .status(200)
      .json({ ad: await updatedAd.getData(), status: "success" });
  },
  deleteAd: async (req, res) => {
    console.log("Deleting ad....");
    const ad = await Ad.findById(req.params.id);
    if (!ad) res.status(404).json({ success: false });
    else {
      if (ad.images.lenght > 0) {
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
        message: ErrorMessage.adRemoved,
        status: "success"
      });
    }
  },
  searchAds: async (req, res) => {
    console.log(req.query);
    const { q, category } = req.query;
    let ads;
    if (category !== "") {
      ads = await Ad.find({
        title: { $regex: new RegExp(q), $options: "i" },
        category: { $regex: new RegExp(category), $options: "i" }
      })
        .sort({ date: -1 })
        .limit(10);
    } else {
      ads = await Ad.find({
        title: { $regex: new RegExp(q), $options: "i" }
      })
        .sort({ date: -1 })
        .limit(10);
    }
    let result = ads.map(async ad => await ad.getData());
    res.status(200).json(await Promise.all(result));
  }
};

module.exports = Ads;
