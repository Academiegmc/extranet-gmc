const express = require("express");
const router = express.Router();
const Users = require("../controllers/Users");
router.post("/login", Users.login);
module.exports = router;
