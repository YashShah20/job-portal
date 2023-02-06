const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

exports.user_auth = (req, res, next) => {
  try {
    const [Bearer, token] = req.headers.authorization.split(" ");
    const user = jwt.verify(token, JWT_SECRET);

    if (user.id.indexOf("U") === -1) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({ error: "invalid token..." });
  }
};

exports.company_auth = (req, res, next) => {
  try {
    const [Bearer, token] = req.headers.authorization.split(" ");
    const company = jwt.verify(token, JWT_SECRET);

    console.log(company);
    if (company.id.indexOf("C") == -1) {
      throw new Error();
    }

    req.company = company;
    next();
  } catch (error) {
    return res.status(400).json({ error: "invalid token..." });
  }
};

exports.setVisitorType = (req, res, next) => {
  let _visitor = {
    id: -1,
    email: "",
    type: "guest"
  };
  try {
    const [Bearer, token] = req.headers.authorization.split(" ");
    const visitor = jwt.verify(token, JWT_SECRET);

    if (visitor.id.indexOf("U") > -1) {
      _visitor = {
        id: visitor.id,
        email: visitor.email,
        type: "user"
      };
    } else {
      _visitor = {
        id: visitor.id,
        email: visitor.email,
        type: "company"
      };
    }
  } catch (error) {
    console.log(error.message);
  } finally {
    req.visitor = _visitor;
    next();
  }
};
