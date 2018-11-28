const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const keys = require("./config/mongo-key");
const config = require("./config/config");
const fileUpload = require("express-fileupload");
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
//DB Config
const db = keys.mongoURI;
mongoose
  .connect(
    db,
    { useNewUrlParser: true, useFindAndModify: false }
  )
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

app.use("/api/users", users);
app.use("/api/annonces", ads);
app.use("/api/news", news);
app.use("/api/jobs", jobs);
app.listen(config.port, () =>
  console.log(`Example app listening on port: ${config.port}`)
);
