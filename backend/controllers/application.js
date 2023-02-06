const pool = require("../db");
const { company_auth, user_auth, setVisitorType } = require("./auth");

exports.getApplications = [
  setVisitorType,
  async (req, res) => {
    try {
      const { id, email, type } = req.visitor;
      let applications = [];
      let query = ``;
      switch (type) {
        case "user":
          query = `select application.*,(select title from job where job_id=application.job_id) as job_title,(select name from company where company_id in (select company_id from job where job_id=application.job_id)) as company_name from application where user_id=$1 order by applied_on desc,status`;
          applications = await pool.query(query, [id]);

          res.json({ applications: applications.rows });
          break;
        case "company":
          query = `select application.*,job.title,job.salary,job.n_openings,(select first_name || ' ' || last_name from users where user_id=application.user_id) as username from application join job on application.job_id=job.job_id where application.job_id in (select job_id from job where company_id=$1) order by job_id,applied_on desc`;

          applications = await pool.query(query, [id]);
          res.json({ applications: applications.rows });
          break;

        default:
          res.status(400).json({ error: "user or company login required..." });
          break;
      }
    } catch (error) {
      console.log(error.message);
    }
  }
];

exports.getApplicationById = [
  setVisitorType,
  async (req, res) => {
    try {
      const { id, type } = req.visitor;
      const { app_id } = req.params;

      let query = ``;
      let application = {};

      switch (type) {
        case "user":
          query = `select application.*,(select title from job where job_id=application.job_id) from application where application_id=$1 and user_id=$2;`;
          application = await pool.query(query, [app_id, id]);

          if (application.rowCount === 0) {
            return res.status(400).json({ error: "application not found..." });
          }

          res.json({ application: application.rows });
          break;

        case "company":
          query = `select application.*,(select title from job where job_id=application.job_id) from application where application_id=$1 and job_id in (select job_id from job where company_id=$2);`;
          application = await pool.query(query, [app_id, id]);

          if (application.rowCount === 0) {
            return res.status(400).json({ error: "application not found..." });
          }

          const user_id = application.rows[0].user_id;

          const user = await pool.query("select first_name,last_name,email,birth_date,address from users where user_id=$1", [user_id])
          res.json({ application: application.rows[0], user: user.rows[0] });
          break;

        default:
          res.status(400).json({ error: "user or company login required..." });
          break;
      }
    } catch (error) {
      console.log(error.message);
    }
  }
];

exports.updateApplication = [
  company_auth,
  async (req, res) => {
    try {
      const { app_id } = req.params;
      const company_id = req.company.id;

      const { status } = req.body;

      const query = `update application set status=$3 where application_id=$1 and job_id in (select job_id from job where company_id=$2) returning *`;

      const updatedApplication = await pool.query(query, [
        app_id,
        company_id,
        status
      ]);

      if (updatedApplication.rowCount > 0) {
        res.json({ application: updatedApplication.rows });
      }
    } catch (error) {
      console.log(error.message);
    }
  }
];

exports.addApplication = [
  user_auth,
  async (req, res) => {
    try {
      const user_id = req.user.id;
      const { applied_on, message, status, resume_url, job_id } = req.body;

      const query = `INSERT INTO public.application (
      user_id, applied_on, message, status, resume_url, job_id)
      VALUES ( $1, $2, $3, $4, $5, $6) returning *;`;

      const newApplication = await pool.query(query, [
        user_id,
        applied_on,
        message,
        status,
        resume_url,
        job_id
      ]);

      if (newApplication.rowCount === 1) {
        res.json({ application: newApplication.rows[0] });
      }
    } catch (error) {
      console.log(error.message);
    }
  }
];
