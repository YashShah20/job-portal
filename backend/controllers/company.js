const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const pool = require("../db");
const { company_auth, setVisitorType } = require("./auth");

exports.home = [
  company_auth,
  (req, res) => {
    console.log(`company home`);
  }
];

exports.profile = [
  company_auth,
  (req, res) => {
    console.log(`company profile`);
  }
];

exports.getCompanyById = [
  setVisitorType,
  async (req, res) => {
    try {
      const { com_id } = req.params;
      let query = `select name,
        description,
        address_line,
        city,
        state,
        country,
        pin,
        website_url,
        email from company where company_id=$1 and is_active=true`;

      const company = await pool.query(query, [com_id]);

      if (company.rowCount === 0) {
        return res.status(404).json({ error: "company not found" });
      }
      res.json({ company: company.rows[0] });
    } catch (error) {
      console.log(error.message);
    }
  }
];
exports.getCompanies = [
  async (req, res) => {
    try {
      let query = `select company_id,name,(select count(*) from job where company_id=company.company_id) as jobs_posted from company where is_active=true`;

      const companyList = await pool.query(query);

      if (companyList.rowCount === 0) {
        return res.status(404).json({ error: "companies not found" });
      }
      res.json({ companies: companyList.rows });
    } catch (error) {
      console.log(error.message);
    }
  }
];

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const company = await pool.query("select * from company where email=$1", [
      email
    ]);

    if (!company || company.rowCount === 0) {
      return res.status(400).json({ error: "invalid credentials..." });
    }

    const matchedPassword = await bcrypt.compare(
      password,
      company.rows[0].password
    );

    if (!matchedPassword) {
      return res.status(400).json({ error: "invalid credentials..." });
    }

    const { company_id } = company.rows[0];
    const token = jwt.sign({ id: company_id, email: email }, JWT_SECRET);

    res.json({ id: company.rows[0].company_id,token });
  } catch (error) {
    console.log(error.message);
  }
};

exports.signup = [
  async (req, res, next) => {
    try {
      console.log(req.body);
      const { email } = req.body;

      const existingCompany = await pool.query(
        "select * from company where email=$1",
        [email]
      );

      if (existingCompany.rowCount > 0) {
        return res.status(400).json({ error: "email already in use..." });
      }
      next();
    } catch (error) {
      console.log(error);
    }
  },
  async (req, res) => {
    try {
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
      } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const company = await pool.query(
        "INSERT INTO company (name, description, address_line, city, state, country, pin, website_url, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
        [
          name,
          description,
          address_line,
          city,
          state,
          country,
          pin,
          website_url,
          email,
          hashedPassword
        ]
      );

      const { company_id } = company.rows;
      if (company.rowCount === 1) {
        const token = jwt.sign({ id: company_id, email: email }, JWT_SECRET);
        console.log(token);

        res.json({ message: "signed up successfully!!" });
      } else {
        res.status(400).json({ error: "signup failed..." });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "signup failed..." });
    }
  }
];
