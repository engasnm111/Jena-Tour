const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
var cookieSession = require("cookie-session");
const MapRoutes = require("./routes/map.routes");
const usersRoutes = require("./routes/users.routes");
const mysql = require("mysql");
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection({
  host: "us-cdbr-east-06.cleardb.net",
  user: "bf3a9dd6fdeed5",
  password: "0d4be3cf",
  database: "heroku_26310da32c906f9",
});

// connect to database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to database");
});
global.db = db;

// configure middleware
app.set("port", process.env.PORT || PORT); // set express to use this port
app.set("views", __dirname + "/views"); // set express to look in this folder to render our view
app.set("view engine", "ejs"); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, "public"))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

app.set("trust proxy", 1); // trust first proxy

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

// routes for the app
app.use("/map", MapRoutes);
app.use("/admin", usersRoutes);

app.get("/", function (req, res, next) {
  let mapid = 1;
  let querymapgrid =
    "SELECT * FROM `mapgrid` WHERE map_id = '" +
    mapid +
    "' ORDER BY mapgrid_id ASC";
  let querymap = "SELECT * FROM `map` ORDER BY map_id ASC";
  db.query(querymapgrid, (err, result) => {
    db.query(querymap, (err, result2) => {
      if (err) {
        res.redirect("/");
      }
      res.render("index.ejs", {
        title: "Welcome to Virtual Tour",
        map: result,
        mapid: result2,
        map_id: mapid,
      });
    });
  });
});

app.get("/(:id)", function (req, res, next) {
  let mapid = req.params.id;
  let querymapgrid =
    "SELECT * FROM `mapgrid` WHERE map_id = '" +
    mapid +
    "' ORDER BY mapgrid_id ASC";
  let querymap = "SELECT * FROM `map` ORDER BY map_id ASC";
  db.query(querymapgrid, (err, result) => {
    db.query(querymap, (err, result2) => {
      if (err) {
        res.redirect("/");
      }
      res.render("index.ejs", {
        title: "Welcome to Virtual Tour",
        map: result,
        mapid: result2,
        map_id: mapid,
      });
    });
  });
});

app.get("/map/(:mapid)/(:id)", function (req, res, next) {
  let mapid = req.params.mapid;
  let mapgrid_id = req.params.id;
  let query =
    "SELECT * FROM `mapgrid` WHERE map_id = '" +
    mapid +
    "' AND mapgrid_id = '" +
    mapgrid_id +
    "'";

  // execute query
  db.query(query, (err, result) => {
    if (err) {
      res.redirect("/");
    }
    let query2 =
      "SELECT * FROM `poi` WHERE map_id = '" +
      mapid +
      "' AND mapgrid_id = '" +
      mapgrid_id +
      "'";
    db.query(query2, (err, result2) => {
      res.render("map.ejs", {
        title: "Welcome to UTCC Tour",
        map: result,
        poi: result2,
        mapid: mapid,
      });
    });
  });
});

app.get("*", function (req, res, next) {
  res.status(404);

  res.render("404.ejs", {
    title: "Page Not Found",
  });
});
