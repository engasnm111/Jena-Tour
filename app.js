const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const session = require("express-session");
const MapRoutes = require("./routes/map.routes");
const usersRoutes = require("./routes/users.routes");
var db = require("./db");

// configure middleware
app.set("views", __dirname + "/views"); // set express to look in this folder to render our view
app.set("view engine", "ejs"); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, "public"))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600 * 1000 }, //1hr
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
