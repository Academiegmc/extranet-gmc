const nodemailer = require("nodemailer");
const fs = require("fs");
const Job = require("../models/Job");
const User = require("../models/User");
const ErrorMessage = require("../config/error-messages");
const utils = require("../config/utils");
const config = require("../config/config");

const Jobs = {
  getAllJobs: async (req, res) => {
    let result;
    try {
      const jobs = await Job.find().sort({ jobStartDate: -1 });
      if (!jobs) return res.status(404).json({ success: false });
      result = jobs.map(async job => await job.getData());
      res.status(200).json(await Promise.all(result));
    } catch (error) {
      console.err(error);
    }
  },
  getAllUserAds: async (req, res) => {
    try {
      const jobs = await Job.find({ user: req.params.id }).sort({ date: -1 });
      if (!jobs) return res.status(404).json(err);
      let result = jobs.map(async job => await job.getData());
      res.status(200).json(await Promise.all(result));
    } catch (error) {
      console.error(error);
    }
  },
  getJob: async (req, res) => {
    try {
      const job = await Job.findById({ _id: req.params.id });
      if (!job)
        return res
          .status(404)
          .json({ success: false, message: ErrorMessage.jobNotFound });
      res.status(200).json(await job.getData());
    } catch (error) {
      console.error(error);
    }
  },
  createJobs: async (req, res) => {
    try {
      const user = await User.findById({ _id: req.user.id });
      if (!user) {
        return res
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
      await newJob.save();
      res.status(200).json(job.getData());
    } catch (error) {
      console.error(error);
    }
  },
  updateJobs: async (req, res) => {
    try {
      const job = await Job.findById(req.params.id);
      const skills = req.body.jobSkills.split(utils.arraySplit);
      if (req.body.jobTitle !== "") job.jobTitle = req.body.jobTitle;
      if (req.body.jobDescription !== "")
        job.jobDescription = req.body.jobDescription;
      if (req.body.jobContractType !== "")
        job.jobContractType = req.body.jobContractType;
      if (req.body.jobType !== "") job.jobType = req.body.jobType;
      if (req.body.jobRemuneration !== "")
        job.jobRemuneration = req.body.jobRemuneration;
      if (req.body.jobStartDate !== "")
        job.jobStartDate = req.body.jobStartDate;
      if (req.body.jobSkills !== "") job.jobSkills = skills;
      if (req.body.jobCity !== "") job.jobCity = req.body.jobCity;
      if (req.body.jobCountry !== "") job.jobCountry = req.body.jobCountry;
      if (req.body.jobCompany !== "") job.jobCompany = req.body.jobCompany;
      if (req.body.jobCompanyDescription !== "")
        job.jobCompanyDescription = req.body.jobCompanyDescription;
      if (req.body.jobCompanySite !== "")
        job.jobCompanySite = req.body.jobCompanySite;
      await job.save();
      res.status(200).json(job.getData());
    } catch (error) {
      console.error(error);
    }
  },
  deleteJobs: async (req, res) => {
    try {
      await Job.findOneAndRemove({ _id: req.params.id });
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
    }
  },
  sendApplication: async (req, res) => {
    try {
      const fileData = fs.readFileSync(req.file.path);
      const user = await User.findOne({ email: req.user.mail });
      if (!user)
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
    } catch (error) {
      console.error(error);
    }
  },
  searchJobs: async (req, res) => {
    const { q } = req.query;
    const jobs = Job.find({
      jobTitle: { $regex: new RegExp(q), $options: "mi" }
    })
      .select("jobTitle")
      .limit(10);
    if (!jobs) return res.status(400).json({});
    let jobSearched = [];
    jobs.map((job, index) => {
      jobSearched.push({ _id: job._id, title: job.jobTitle });
    });
    // res.status(200).json(jobs);
    console.log(jobSearched);
    res.status(200).json(jobSearched);
  }
};

module.exports = Jobs;
