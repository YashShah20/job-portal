const {
  getApplications,
  getApplicationById,
  addApplication,
  updateApplication
} = require("../controllers/application");

const express = require("express");
const router = express.Router();

router.get("/", getApplications);
router.get("/:app_id", getApplicationById);
router.post("/add", addApplication);
router.put("/:app_id", updateApplication);

module.exports = router;
