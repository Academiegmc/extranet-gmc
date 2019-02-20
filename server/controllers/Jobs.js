const nodemailer = require("nodemailer");
const fs = require("fs");
const Job = require("../models/Job");
const User = require("../models/User");
const ErrorMessage = require("../config/error-messages");
const utils = require("../config/utils");
const config = require("../config/config");

const Jobs = {
  getAllJobs: (req, res) => {
    Job.find()
      .sort({ jobStartDate: -1 })
      .then(jobs => res.status(200).json(jobs))
      .catch(err => res.status(404).json(err));
  },
  getJob: (req, res) => {
    Job.findById({ _id: req.params.id }, (err, job) => {
      if (err) return res.status(500).json(err);
      if (!job)
        return res
          .status(404)
          .json({ success: false, message: ErrorMessage.jobNotFound });
      res.status(200).json(job);
    });
  },
  createJobs: (req, res) => {
    User.findById({ _id: req.user.id }, (err, user) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (!user) {
        res
          .status(404)
          .json({ auth: false, message: ErrorMessage.userNotFound });
      }
      const skills = req.body.jobSkills.split(utils.arraySplit);
      const newJob = new Job({
        user: user._id,
        jobTitle: req.body.jobTitle,
        jobDescription: req.body.jobDescription,
        jobContractType: req.body.jobContractType,
        jobType: req.body.jobType,
        jobRemuneration: req.body.jobRemuneration,
        jobStartDate: req.body.jobStartDate,
        jobSkills: skills,
        jobCity: req.body.jobCity,
        jobCountry: req.body.jobCountry,
        jobCompany: req.body.jobCompany,
        jobCompanyDescription: req.body.jobCompanyDescription,
        jobCompanySite: req.body.jobCompanySite
      });

      newJob
        .save()
        .then(job => res.status(200).json(job))
        .catch(err => res.status(404).json(err));
    });
  },
  updateJobs: (req, res) => {
    Job.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
      .then(job => res.status(200).json(job))
      .catch(err => res.status(404).json(err));
  },
  deleteJobs: (req, res) => {
    Job.findOneAndRemove({ _id: req.params.id })
      .then(ad => res.status(200).json({ success: true }))
      .catch(err => res.status(404).json(err));
  },
  sendApplication: (req, res) => {
    const fileData = fs.readFileSync(req.file.path);
    User.findOne({ email: req.user.mail }, (err, user) => {
      if (err)
        return res
          .status(404)
          .json({ success: false, message: ErrorMessage.userNotFound });
      let transport = nodemailer.createTransport({
        service: config.mail.service,
        secure: config.mail.secure,
        auth: config.mail.auth,
        tls: config.mail.tls
      });
      let output = `<h1>Hello ${user.name}</h1>`;
      let mailOptions = {
        from: user.name + "<" + user.email + ">",
        to: config.mail.to,
        subject:
          config.mail.subject +
          " - " +
          req.body.poste +
          " - " +
          req.body.agence,
        test: "Hello world?",
        html: output,
        attachments: [{ filename: req.file.originalname, content: fileData }]
      };
      transport.sendMail(mailOptions, (error, info) => {
        if (error) return console.log(error);
        console.log("Message envoyé : %s", info.messageId);
        console.log("URL : %s", nodemailer.getTestMessageUrl(info));
        res.status(200).json({ success: true, message: "Candidature envoyée" });
      });
    });
  },
  searchJobs: (req, res) => {
    const { q } = req.query;
    Job.find({ jobTitle: { $regex: new RegExp(q), $options: "mi" } })
      .select("jobTitle")
      .limit(10)
      .then(jobs => {
        let jobSearched = [];
        jobs.map((job, index) => {
          jobSearched.push({ _id: job._id, title: job.jobTitle });
        });
        // res.status(200).json(jobs);
        console.log(jobSearched);
        res.status(200).json(jobSearched);
      })
      .catch(err => {
        res.status(400).json(err.response);
      });
  }
};

module.exports = Jobs;
