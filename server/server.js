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
// const db = keys.mongoURI;
let db;
if (process.env.NODE_ENV !== "production") {
  if (process.env.NODE_ENV === "test") {
    db = process.env.MONGOURITEST;
  } else {
    db = process.env.MONGOURIDEV;
  }
} else {
  db = process.env.MONGOURIPROD;
}
mongoose
  .connect(db, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.error(err));
mongoose.set("useCreateIndex", true);
app.use("/api/users", users);
app.use("/api/annonces", ads);
app.use("/api/news", news);
app.use("/api/jobs", jobs);
app.listen(config.port, () =>
  console.log(`Server listening on port: ${config.port}`)
);
