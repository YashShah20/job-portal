const express = require("express");
const router = express.Router();

const {
  getJobs,
  getJobById,
  addJob,
  updateJob,
  deleteJob
} = require("../controllers/job");

router.get("/", getJobs);
router.get("/:job_id", getJobById);

router.post("/add", addJob);

router.put("/:job_id", updateJob);

router.delete("/:job_id", deleteJob);

module.exports = router;

