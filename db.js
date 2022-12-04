var mysql = require("mysql2");

var db = mysql.createPool({
  connectionLimit: 10,
  host: "us-cdbr-east-06.cleardb.net",
  user: "bf3a9dd6fdeed5",
  password: "0d4be3cf",
  database: "heroku_26310da32c906f9",
});

db.getConnection(function (err, connection) {
  connection.query("SELECT id FROM map", function (err, rows) {
    console.log(db._freeConnections.indexOf(connection)); // -1

    connection.release();

    console.log(db._freeConnections.indexOf(connection)); // 0
  });
});

Module.exports = db;
