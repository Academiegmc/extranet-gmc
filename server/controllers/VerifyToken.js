const jwt = require("jsonwebtoken");
const config = require("../config/mongo-key");

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(403).json({ auth: false, message: "No token provided." });
  jwt.verify(token, config.secretOrKeys, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ auth: false, message: "Failed to authenticate token." });
    }
    req.user = {
      id: decoded.id,
      mail: decoded.email,
      name: decoded.name
    };
    next();
  });
};

module.exports = verifyToken;
