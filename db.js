const mysql = require("mysql");

var db = mysql.createPool({
  host: "us-cdbr-east-06.cleardb.net",
  user: "bf3a9dd6fdeed5",
  password: "0d4be3cf",
  database: "heroku_26310da32c906f9",
});

db.getConnection((err, connection) => {
  if (err) {
    console.log("Error while connecting ", err);
  } else {
    if (connection) connection.release();
    console.log("Database Connected Successfully!");
  }
});

module.exports = db;
