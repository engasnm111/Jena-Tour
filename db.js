const mysql = require("mysql2");

const db = mysql.createPool({
  HOST: "us-cdbr-east-06.cleardb.net",
  USER: "bf3a9dd6fdeed5",
  PASSWORD: "0d4be3cf",
  DB: "heroku_26310da32c906f9",
}).promise;

module.exports = db;
