require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const keys = require("./config/mongo-key");
const config = require("./config/config");
//Server web
const app = express();

//Routes
const users = require("./routes/users");
const ads = require("./routes/ads");
const news = require("./routes/news");
const jobs = require("./routes/jobs");

//Static files
app.use(express.static(path.join(__dirname, "public")));
//Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(async (req, res, next) => {
  try {
    await next();
  } catch (error) {
    console.error("Error during request", error);
    return res.status(500).json({});
  }
});
//DB Config
const db = keys.mongoURI;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.error(err));
app.use("/api/users", users);
app.use("/api/annonces", ads);
app.use("/api/news", news);
app.use("/api/jobs", jobs);
app.listen(config.port, () =>
  console.log(`Server listening on port: ${config.port}`)
);
