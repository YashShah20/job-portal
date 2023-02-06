const express = require("express");
const router = express.Router();

const {
  user_signin,
  user_signup,
  home,
  profile
} = require("../controllers/user");

router.post("/signin", user_signin);
router.post("/signup", user_signup);

router.get("/", home);
router.get("/profile", profile);
module.exports = router;
