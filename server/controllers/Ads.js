const Ad = require("../models/Ad");
const User = require("../models/User");
const ErrorMessage = require("../config/error-messages");

const Ads = {
  getAllAds: (req, res) => {
    Ad.find()
      .sort({ date: -1 })
      .then(ads => res.status(200).json(ads))
      .catch(err => res.status(404).json(err));
  },
  getAd: (req, res) => {
    Ad.findById(req.params.id)
      .then(ad => res.status(200).json(ad))
      .catch(err =>
        res.status(404).json({ error: err, message: ErrorMessage.adNotFound })
      );
  },
  createAd: (req, res) => {
    User.findOne({ _id: req.user.id }, (err, user) => {
      if (err) {
        return res
          .status(500)
          .json({ auth: false, message: ErrorMessage.serverError });
      }
      if (!user)
        return res.status(401).json({ message: ErrorMessage.userNotFound });
      const newAd = new Ad({
        user: user.id,
        name: user.name,
        title: req.body.title,
        description: req.body.description,
        category: req.body.category
      });

      newAd
        .save()
        .then(ad => res.status(200).json(ad))
        .catch(err => res.status(400).json(err));
    });
  },
  updateCommentAd: (req, res) => {
    Ad.findById(req.params.id).then(ad => {
      if (ad) {
        ad.comments.push(req.body);
        ad.save()
          .then(updatedComments =>
            res.status(200).json({ success: true, data: updatedComments })
          )
          .catch(err => res.status(400).json({ success: false }));
      }
    });
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
  deleteAd: (req, res) => {
    Ad.findOneAndRemove({ _id: req.params.id }).then(ad =>
      res.status(200).json({ success: true, message: ErrorMessage.adRemoved })
    );
  },
  searchAds: (req, res) => {
    const { q } = req.query;
    Ad.find({ title: { $regex: new RegExp(q), $options: "mi" } })
      .select("title")
      .limit(10)
      .then(ad => {
        console.log(ad);
        res.status(200).json(ad);
      })
      .catch(err => {
        res.status(400).json(err.response);
      });
  }
};

module.exports = Ads;
