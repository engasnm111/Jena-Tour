const mysql = require("mysql");

var db = mysql.createPool({
  connectionLimit: 10,
  host: "us-cdbr-east-06.cleardb.net",
  user: "bf3a9dd6fdeed5",
  password: "0d4be3cf",
  database: "heroku_26310da32c906f9",
});

db.getConnection(function (err, connnection) {
  // execute query
  // ...
  connnection.release();
});

pool.end(function (err) {
  if (err) {
    return console.log(err.message);
  }
  // close all connections
});

module.exports = db;
