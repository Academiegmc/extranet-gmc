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

    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;

    //Get total pages
    const count = await Job.count();
    const totalPages = Math.ceil(count / limit);
    console.log("====================================");
    console.log(totalPages);
    console.log("====================================");

    const jobs = await Job.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });
    if (!jobs) return res.status(404).json({ success: false });
    result = jobs.map(async job => await job.getData());
    res.status(200).json({ jobs: await Promise.all(result), totalPages });
  },
  getAllUserAds: async (req, res) => {
    const jobs = await Job.find({ user: req.params.id }).sort({
      createdAt: -1
    });
    if (!jobs) return res.status(404).json(err);
    let result = jobs.map(async job => await job.getData());
    res.status(200).json(await Promise.all(result));
  },
  getJob: async (req, res) => {
    const job = await Job.findById({ _id: req.params.id });
    if (!job)
      return res
        .status(404)
        .json({ success: false, message: ErrorMessage.jobNotFound });
    res.status(200).json(await job.getData());
  },
  createJobs: async (req, res) => {
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
    res.status(200).json({ job: await newJob.getData(), status: "success" });
  },
  updateJobs: async (req, res) => {
    const job = await Job.findById(req.params.id);
    if (!job)
      return res.status(400).json({ success: false, message: "Not Found" });
    const skills = req.body.jobSkills.split(utils.arraySplit);
    if (req.body.jobTitle !== "") job.jobTitle = req.body.jobTitle;
    if (req.body.jobDescription !== "")
      job.jobDescription = req.body.jobDescription;
    if (req.body.jobContractType !== "")
      job.jobContractType = req.body.jobContractType;
    if (req.body.jobType !== "") job.jobType = req.body.jobType;
    if (req.body.jobRemuneration !== "")
      job.jobRemuneration = req.body.jobRemuneration;
    if (req.body.jobStartDate !== "") job.jobStartDate = req.body.jobStartDate;
    if (req.body.jobSkills !== "") job.jobSkills = skills;
    if (req.body.jobCity !== "") job.jobCity = req.body.jobCity;
    if (req.body.jobCountry !== "") job.jobCountry = req.body.jobCountry;
    if (req.body.jobCompany !== "") job.jobCompany = req.body.jobCompany;
    if (req.body.jobCompanyDescription !== "")
      job.jobCompanyDescription = req.body.jobCompanyDescription;
    if (req.body.jobCompanySite !== "")
      job.jobCompanySite = req.body.jobCompanySite;
    await job.save();
    res.status(200).json({ job: await job.getData(), status: "success" });
  },
  deleteJobs: async (req, res) => {
    await Job.findOneAndRemove({ _id: req.params.id });
    res.status(200).json({ status: "success" });
  },
  sendApplication: async (req, res) => {
    const fileData = await fs.readFileSync(req.file.path);
    const user = await User.findOne({ email: req.user.mail });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: ErrorMessage.userNotFound });
    let transport = nodemailer.createTransport({
      host: process.env.NODEMAILER_SMTP,
      port: process.env.NODEMAILER_SMTP_PORT,
      secure: process.env.NODEMAILER_SECURE,
      auth: {
        user: process.env.NODEMAILER_USER_EMAIL,
        pass: process.env.NODEMAILER_USER_PASSWORD
      },
      tls: { rejectUnauthorized: process.env.NODEMAILER_TLS }
    });
    let output = `<h1>Hello ${user.name}</h1><p>Merci d'avoir postulé au poste de ${req.body.jobTitle} chez ${req.body.jobCompany}</p><h3>Lettre de motivation</h3><p>${req.body.lm}</p>`;
    let mailOptions = {
      from: user.name + "<" + user.email + ">",
      to: process.env.NODEMAILER_USER_RECEIVER,
      subject:
        config.mail.subject +
        " - " +
        req.body.jobTitle +
        " - " +
        req.body.jobCompany,
      test: "Hello world?",
      html: output,
      attachments: [{ filename: req.file.originalname, content: fileData }]
    };
    transport.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error(error);
        return error;
      }
      const job = await Job.findById(req.params.id);
      if (!job)
        return res
          .status(404)
          .json({ success: false, message: ErrorMessage.jobNotFound });
      job.jobCandidates.push(req.user.id);
      await job.save();
      console.log("Message envoyé : %s", info.messageId);
      console.log("URL : %s", nodemailer.getTestMessageUrl(info));
      res.status(200).json({
        success: true,
        message: "Candidature envoyée",
        status: "success"
      });
    });
  },
  searchJobs: async (req, res) => {
    const { q, contractType } = req.query;
    let jobs;
    if (contractType !== "") {
      jobs = await Job.find({
        jobTitle: { $regex: new RegExp(q), $options: "mi" },
        jobContractType: { $regex: new RegExp(contractType), $options: "mi" }
      })
        .limit(10)
        .sort({ createdAt: -1 });
    } else {
      jobs = await Job.find({
        jobTitle: { $regex: new RegExp(q), $options: "mi" }
      })
        .limit(10)
        .sort({ createdAt: -1 });
    }
    if (!jobs) return res.status(400).json({});
    let result = jobs.map(async job => await job.getData());
    res.status(200).json(await Promise.all(result));
  }
};

module.exports = Jobs;
