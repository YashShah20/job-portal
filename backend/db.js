const { db } = require("./config");
const Pool = require("pg").Pool;

const pool = new Pool(db);

module.exports = pool;
