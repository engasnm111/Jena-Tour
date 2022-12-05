const mysql = require("mysql");

var db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "utcc",
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
