const mysql = require("mysql");

var db = mysql.createPool({
  host: "us-cdbr-east-06.cleardb.net",
  user: "bece4ed5f2fc4d",
  password: "9e80a0bb",
  database: "heroku_962c2ea55add6f7",
});

// var db = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "utcc",
// });

db.getConnection((err, connection) => {
  if (err) {
    console.log("Error while connecting ", err);
  } else {
    if (connection) connection.release();
    console.log("Database Connected Successfully!");
  }
});

module.exports = db;
