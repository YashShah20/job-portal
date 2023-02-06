const pool = require("../db");
const { company_auth, setVisitorType } = require("./auth");

const getLocations = async () => {
  const locations = await pool.query("select location from locations");
  return locations.rows.map(location => location.location);
};

const getSkills = async () => {
  const skills = await pool.query("select skill from skills");
  return skills.rows.map(skill => skill.skill);
};

exports.getJobs = [
  setVisitorType,
  async (req, res) => {
    let query = ``;
    let jobs = [];

    const { id, email, type } = req.visitor;
    console.log(id, type);

    let locations = [];
    let skills = [];

    await getLocations().then(_locations => {
      locations = _locations;
    });

    await getSkills().then(_skills => {
      skills = _skills;
    });

    console.log(locations, skills);
    switch (type) {
      case "user":
        const user_id = id;
        const applications = await pool.query(
          "select application.*,(select title from job where job_id=application.job_id) from application where user_id=$1 and status='applied' order by applied_on desc limit 5;",
          [user_id]
        );

        console.log(applications.rows);
        query = `select job.*,(select name from company where company_id=job.company_id) as company_name from job order by created_on,due_date,n_openings desc`;
        jobs = await pool.query(query);

        res.json({
          applications: applications.rows,
          jobs: jobs.rows,
          locations,
          skills
        });
        break;
      case "company":
        const company_id = id;
        query = `select * from job where company_id=$1 order by due_date,experience desc,n_openings desc`;
        jobs = await pool.query(query, [company_id]);
        res.json({ jobs: jobs.rows, locations, skills });
        break;
      case "guest":
        query = `select job.*,(select name from company where company_id=job.company_id) as company_name from job order by created_on,due_date,n_openings desc`;
        jobs = await pool.query(query);
        res.json({ jobs: jobs.rows, locations, skills });
        break;
      default:
        break;
    }
  }
];

exports.getJobById = [
  setVisitorType,
  async (req, res) => {
    const { id, type } = req.visitor;
    const { job_id } = req.params;

    let query = ``;
    let _job = {};

    console.log(job_id);

    switch (type) {
      case "user":
        query = `select job.*,(select name from company where company_id=job.company_id) as company_name,(select application_id from application where user_id=$2 and job_id=job.job_id) as application_id,(select string_agg(location,'|') from locations where jobs like '%'||job.job_id||'|%') as locations,(select string_agg(skill,'|') from skills where jobs like '%'||job.job_id||'|%') as skills from job where job_id=$1`;

        var job = await pool.query(query, [job_id, id]);

        if (job.rowCount === 0) {
          return res.status(404).json({ error: "Job not found" });
        }

        _job = job.rows[0];
        _job.applied = _job.application_id != null;
        _job.locations =
          _job.locations != null ? _job.locations.split("|") : null;
        _job.skills = _job.skills != null ? _job.skills.split("|") : null;

        res.json({ job: _job });
        break;
      case "company":
        query = `select job.*,(select string_agg(location,'|') from locations where jobs like '%'||job.job_id||'|%') as locations,(select string_agg(skill,'|') from skills where jobs like '%'||job.job_id||'|%') as skills from job where company_id=$2 and job_id=$1`;
        var job = await pool.query(query, [job_id, id]);

        if (job.rowCount === 0) {
          return res.status(404).json({ error: "Job not found" });
        }

        _job = job.rows[0];
        _job.locations =
          _job.locations != null
            ? _job.locations.split("|").map(location => {
              return {
                old: location,
                new: location
              };
            })
            : null;

        _job.skills =
          _job.skills != null
            ? _job.skills.split("|").map(skill => {
              return {
                old: skill,
                new: skill
              };
            })
            : null;
        res.json({ job: _job });
        break;
      case "guest":
        query = `select job.*,(select name from company where company_id=job.company_id) as company_name,(select string_agg(location,'|') from locations where jobs like '%'||job.job_id||'|%') as locations,(select string_agg(skill,'|') from skills where jobs like '%'||job.job_id||'|%') as skills from job where job_id=$1`;

        var job = await pool.query(query, [job_id]);

        if (job.rowCount === 0) {
          return res.status(404).json({ error: "Job not found" });
        }

        _job = job.rows[0];
        _job.locations =
          _job.locations != null ? _job.locations.split("|") : null;
        _job.skills = _job.skills != null ? _job.skills.split("|") : null;

        res.json({ job: _job });
        break;
      default:
        break;
    }
  }
];

exports.addJob = [
  company_auth,
  async (req, res) => {
    try {
      const company_id = req.company.id;
      const {
        title,
        description,
        experience,
        salary,
        due_date,
        created_on,
        n_openings,
        locations,
        key_skills
      } = req.body;

      const query = `INSERT INTO job (
        title, description, experience, salary, due_date, created_on, n_openings, company_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning *;`;

      const job = await pool.query(query, [
        title,
        description,
        experience,
        salary,
        due_date,
        created_on,
        n_openings,
        company_id
      ]);

      const { job_id } = job.rows[0];

      locations.map(async _location => {
        const location = await pool.query(
          "select * from locations where location=$1",
          [_location]
        );

        if (location.rowCount === 0) {
          const newLocation = await pool.query(
            "insert into locations (location,jobs) values ($1,$2)",
            [_location, `${job_id}|`]
          );
        } else {
          const { id, jobs } = location.rows[0];
          if (jobs.indexOf(`${job_id}|`) === -1) {
            const updatedLocation = await pool.query(
              "update locations set jobs=$1 where id=$2",
              [`${jobs}${job_id}|`, id]
            );
          }
        }
      });

      key_skills.map(async _skill => {
        const skill = await pool.query("select * from skills where skill=$1", [
          _skill
        ]);

        if (skill.rowCount === 0) {
          const newSkill = await pool.query(
            "insert into skills (skill,jobs) values ($1,$2)",
            [_skill, `${job_id}|`]
          );
        } else {
          const { id, jobs } = skill.rows[0];
          if (jobs.indexOf(`${job_id}|`) === -1) {
            const updatedSkill = await pool.query(
              "update skills set jobs=$1 where id=$2",
              [`${jobs}${job_id}|`, id]
            );
          }
        }
      });

      res.json({ jobs: job.rows });
    } catch (error) {
      console.log(error.message);
    }
  }
];

exports.updateJob = [
  company_auth,
  async (req, res) => {
    const { job_id } = req.params;
    const {
      title,
      description,
      experience,
      salary,
      due_date,
      n_openings,
      locations,
      key_skills
    } = req.body;

    console.log(req.body);

    const query = `UPDATE public.job
      SET  title=$2, description=$3, experience=$4, salary=$5, due_date=$6, n_openings=$7
      WHERE job_id=$1 returning *;`;
    const updatedJob = await pool.query(query, [
      job_id,
      title,
      description,
      experience,
      salary,
      due_date,
      n_openings
    ]);

    if (locations && locations.length > 0) {
      locations.map(async _location => {
        if (_location.old != _location.new) {
          const updatedLocation = await pool.query(
            "update locations set location=$1 where location=$2",
            [_location.new, _location.old]
          );
        }
      });
    }

    if (key_skills && key_skills.length > 0) {
      key_skills.map(async _skill => {
        if (_skill.old != _skill.new) {
          const updatedskill = await pool.query(
            "update skills set skill=$1 where skill=$2",
            [_skill.new, _skill.old]
          );
        }
      });
    }
    res.json({ updatedJob: updatedJob.rows });
  }
];

exports.deleteJob = [
  company_auth,
  async (req, res) => {
    try {
      const { job_id } = req.params;

      const deletedJob = await pool.query(
        "delete from job where job_id=$1 returning job_id",
        [job_id]
      );

      res.json({ status: "ok" });
    } catch (error) {
      console.log(error.message);
    }
  }
];
