const bcrypt = require("bcrypt");
const { jobs } = require("./jobData");
const { applications } = require("./applicationData");
const { users } = require("./userData");
const { companies } = require("./companyData");

applications.map((application) => {
  const {
    user_id,
    applied_on,
    message,
    status,
    resume_url,
    job_id
  } = application;
  const query = `INSERT INTO public.application (user_id, applied_on, message, status, resume_url, job_id) VALUES ('${user_id}', '${applied_on}', '${message}', '${status}', '${resume_url}', ${job_id});`;
  console.log(query);
});

jobs.map((job, index) => {
  const {
    title,
    description,
    experience,
    salary,
    due_date,
    created_on,
    n_openings,
    company_id,
    locations,
    key_skills
  } = job;
  const jobQuery = `INSERT INTO job (job_id, title, description, experience, salary, due_date, created_on, n_openings, company_id) VALUES (${index +
    1}, '${title}', '${description}', ${experience}, ${salary}, '${due_date}', '${created_on}', ${n_openings}, '${company_id}');`;

  console.log(jobQuery);

  locations.map(location => {
    const locationQuery = `update locations set jobs=jobs||'${index +
      1}|' where location='${location}';`;
    console.log(locationQuery);
  });

  key_skills.map(skill => {
    const skillQuery = `update skills set jobs=jobs||'${index +
      1}|' where skill='${skill}';`;
    console.log(skillQuery);
  });
});

users.map(async _user => {
  const {
    first_name,
    last_name,
    email,
    birth_date,
    profile_pic,
    address,
    password
  } = _user;

  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `insert into users (first_name,last_name,email,birth_date,profile_pic,address,password) values ('${first_name}','${last_name}','${email}','${birth_date}','${profile_pic}','${address}','${hashedPassword}');`;

  console.log(query);
});
companies.map(async _company => {
  const {
    name,
    description,
    address_line,
    city,
    state,
    country,
    pin,
    website_url,
    email,
    password
  } = _company;

  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `INSERT INTO company (name, description, address_line, city, state, country, pin, website_url, email, password) VALUES (
    '${name}',
    '${description}',
    '${address_line}',
    '${city}',
    '${state}',
    '${country}',
    '${pin}',
    '${website_url}',
    '${email}',
    '${hashedPassword}');`;
  console.log(query);
});
