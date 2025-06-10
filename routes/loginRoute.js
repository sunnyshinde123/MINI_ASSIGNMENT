const express = require("express");

const {
  handleGetLoginPage,
  handleLoginUser,
  handleGetSignupPage,
  handleSignupUser,
  handleLogoutUser,
} = require("../controllers/loginController");

const router = express.Router();

router.route("/login").get(handleGetLoginPage).post(handleLoginUser);

router.route("/signup").get(handleGetSignupPage).post(handleSignupUser);

router.post("/logout", handleLogoutUser);

module.exports = router;
