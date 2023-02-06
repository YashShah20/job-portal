const express = require("express");
const router = express.Router();

const {
  home,
  profile,
  signin,
  signup,
  getCompanyById,
  getCompanies
} = require("../controllers/company");

router.post("/signin", signin);
router.post("/signup", signup);

router.get("/", home);
router.get("/profile", profile);
router.get("/list", getCompanies);
router.get("/:com_id", getCompanyById);

module.exports = router;
