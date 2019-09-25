const jwt = require("jsonwebtoken");
const config = require("../config/mongo-key");

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(403).json({ auth: false, message: "Session expirée." });
  jwt.verify(token, config.secretOrKeys, (err, decoded) => {
    if (err)
      return res.status(403).json({ auth: false, message: "Session expirée." });
    req.user = {
      id: decoded.id,
      mail: decoded.email,
      name: decoded.name,
      profile_pic: decoded.profile_pic
    };
    next();
  });
};

module.exports = verifyToken;
