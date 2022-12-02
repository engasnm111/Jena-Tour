var mysql = require("mysql");

dbConnectionInfo = {
  HOST: "us-cdbr-east-06.cleardb.net",
  USER: "bf3a9dd6fdeed5",
  PASSWORD: "0d4be3cf",
  DB: "heroku_26310da32c906f9",
  PORT: "3306",
  connectionLimit: 5, //mysql connection pool length
};

var db = mysql.createPool(dbConnectionInfo);

// Attempt to catch disconnects
db.on("connection", function (connection) {
  console.log("DB Connection established");

  connection.on("error", function (err) {
    console.error(new Date(), "MySQL error", err.code);
  });
  connection.on("close", function (err) {
    console.error(new Date(), "MySQL close", err);
  });
});

module.exports = db;
