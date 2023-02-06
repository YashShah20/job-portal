const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const pool = require("../db");
const { user_auth } = require("./auth");

exports.user_signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query("select * from users where email=$1", [
      email
    ]);

    if (!user || user.rowCount === 0) {
      return res.status(400).json({ error: "invalid credentials..." });
    }

    const matchedPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!matchedPassword) {
      return res.status(400).json({ error: "invalid credentials..." });
    }

    const { user_id } = user.rows[0];
    const token = jwt.sign({ id: user_id, email: email }, JWT_SECRET);

    res.json({ id: user.rows[0].user_id, token });
  } catch (error) {
    console.log(error.message);
  }
};

exports.user_signup = [
  async (req, res, next) => {
    try {
      console.log(req.body);
      const { email } = req.body;

      const existingUser = await pool.query(
        "select * from users where email=$1",
        [email]
      );

      if (existingUser.rowCount > 0) {
        return res.status(400).json({ error: "user already exists..." });
      }
      next();
    } catch (error) {
      console.log(error);
    }
  },
  async (req, res) => {
    try {
      const { first_name, last_name, email, DOB, address, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await pool.query(
        "insert into users (first_name,last_name,email,birth_date,address,password) values ($1,$2,$3,$4,$5,$6)",
        [first_name, last_name, email, DOB, address, hashedPassword]
      );

      const { user_id } = user.rows;
      if (user.rowCount === 1) {
        const token = jwt.sign({ id: user_id, email: email }, JWT_SECRET);

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

exports.home = [user_auth, (req, res) => { }];
exports.profile = [
  user_auth,
  (req, res) => {
    console.log(`user profile`);
  }
];
