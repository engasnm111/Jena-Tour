const mysql = require("mysql");
const dbConfig = require("../db.js");

var db = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

exports.getloginpage = function (req, res) {
  // If the user is loggedin
  if (req.session.loggedin) {
    // Output username
    res.redirect("/map/home");
  } else {
    res.render("login", {
      title: "Admin Login",
      error1: false,
      error2: false,
      logout: false,
    });
  }
  res.end();
};

exports.getlogin = function (req, res) {
  // Capture the input fields
  let username = req.body.username;
  let password = req.body.password;
  // Ensure the input fields exists and are not empty
  if (username && password) {
    // Execute SQL query that'll select the account from the database based on the specified username and password
    db.query(
      "SELECT * FROM accounts WHERE username = ? AND password = ?",
      [username, password],
      function (error, results, fields) {
        // If there is an issue with the query, output the error
        if (error) throw error;
        // If the account exists
        if (results.length > 0) {
          // Authenticate the user
          req.session.loggedin = true;
          req.session.username = username;
          // Redirect to home page
          res.redirect("/map/home");
        } else {
          res.render("login", {
            title: "Admin Login",
            error1: true,
            error2: false,
            logout: false,
          });
        }
        res.end();
      }
    );
  } else {
    res.render("login", {
      title: "Admin Login",
      error1: false,
      error2: true,
      logout: false,
    });
    res.end();
  }
};

exports.getlogout = function (req, res) {
  req.session = null;
  res.render("login", {
    title: "Admin Login",
    error1: false,
    error2: false,
    logout: true,
  });
  res.end();
};

module.exports = db;
