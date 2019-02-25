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
// app.use(express.static(path.join(__dirname, "../app/build")));
// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../app/build", "index.html"));
// });
//Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
//DB Config
const db = keys.mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));
mongoose.set("useCreateIndex", true);
app.get("/test", (req, res) => {
  res.send("Test OK !");
});
app.use("/api/users", users);
app.use("/api/annonces", ads);
app.use("/api/news", news);
app.use("/api/jobs", jobs);
app.listen(config.port, () =>
  console.log(`Server listening on port: ${config.port}`)
);
