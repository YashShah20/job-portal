const express = require("express");
const cors = require("cors");

const { getJobs } = require("./controllers/job");
const { sendError } = require("./controllers/error");
const userRouter = require("./routes/user");
const companyRouter = require("./routes/company");
const jobRouter = require("./routes/job");
const applicationRouter = require("./routes/application");
const bodyParser = require("body-parser");
const pool = require("./db");
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/jobs", jobRouter);
app.use("/applications", applicationRouter);
app.use("/company", companyRouter);
app.get("/", getJobs);
app.all("*", sendError);

app.listen(3000, () => {
  console.log(`app is running at port 3000`);
});
