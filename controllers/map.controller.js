const db = require("../db.js");

db.getConnection((err, connection) => {
  if (err) {
    console.log("Error while connecting ", err);
  } else {
    if (connection) connection.release();
    console.log("Database Connected Successfully!");
  }
});

// Get Page //
exports.addMapPage = (req, res) => {
  let mapid = req.params.map_id;
  let mapgrid_id = req.params.id;

  let querymap = "SELECT * FROM `map` WHERE map_id = '" + mapid + "' ";
  db.query(querymap, (err, result2) => {
    if (req.session.loggedin) {
      res.render("add-map.ejs", {
        title: "Add Map Cover",
        error3: false,
        error4: false,
        success: false,
        mapgrid: mapgrid_id,
        map: result2[0],
      });
    } else {
      res.render("login", {
        title: "Admin Login",
        error1: false,
        error2: false,
        logout: false,
      });
    }
    res.end();
  });
};

exports.previewMapPage = (req, res) => {
  let map_id = req.params.id;
  let query =
    "SELECT * FROM `mapgrid` WHERE map_id = '" +
    map_id +
    "' ORDER BY mapgrid_id ASC";

  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (req.session.loggedin) {
      res.render("preview.ejs", {
        title: "Add Map Preview",
        map: result,
        mapid: map_id,
      });
    } else {
      res.render("login", {
        title: "Admin Login",
        error1: false,
        error2: false,
        logout: false,
      });
    }
    res.end();
  });
};

exports.editMapPage = (req, res) => {
  let mapid = req.params.map_id;
  let mapgrid_id = req.params.id;
  let query =
    "SELECT * FROM `mapgrid` WHERE map_id = '" +
    mapid +
    "' AND mapgrid_id = '" +
    mapgrid_id +
    "'";
  let query2 =
    "SELECT * FROM `poi` WHERE map_id = '" +
    mapid +
    "' AND mapgrid_id = '" +
    mapgrid_id +
    "'";
  db.query(query, (err, result1) => {
    db.query(query2, (err, result2) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (req.session.loggedin) {
        res.render("edit-map.ejs", {
          title: "Edit  Map | " + mapgrid_id,
          map: result1[0],
          poi: result2,
          mapid: mapid,
          error: false,
          success: false,
        });
      } else {
        res.render("login", {
          title: "Admin Login",
          error1: false,
          error2: false,
          logout: false,
        });
      }
      res.end();
    });
  });
};

exports.HomeMapPage = (req, res) => {
  let query = "SELECT * FROM `map` ORDER BY map_id ASC"; // query database to get all the map
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (req.session.loggedin) {
      res.render("home.ejs", {
        title: "Home Map",
        map: result,
      });
    } else {
      res.render("login", {
        title: "Admin Login",
        error1: false,
        error2: false,
        logout: false,
      });
    }
    res.end();
  });
};

exports.addprojectPage = (req, res) => {
  let map_id = req.params.id;
  if (req.session.loggedin) {
    res.render("add-project.ejs", {
      title: "Add New project",
      map: map_id,
    });
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
/// End get page

/// Post page

exports.addproject = (req, res) => {
  let mapid = req.params.id;
  let map_name = req.body.map_name;
  let map_description = req.body.map_description;
  let uploadedFile = req.files.image;
  let image_name = uploadedFile.name;
  let fileExtension = uploadedFile.mimetype.split("/")[1];
  image_name = map_name + "." + fileExtension;
  uploadedFile.mv(`public/assets/img/${mapid}/${image_name}`, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    let query =
      "INSERT INTO map (map_id,name,description,image) VALUES ('" +
      mapid +
      "','" +
      map_name +
      "','" +
      map_description +
      "','" +
      image_name +
      "')";
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.redirect("/map/home");
      res.end();
    });
  });
};

exports.addMap = (req, res) => {
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }
  let mapid = req.params.map_id;
  let mapgrid_id = req.params.id;
  let uploadedFile = req.files.image;
  let image_name = uploadedFile.name;
  let fileExtension = uploadedFile.mimetype.split("/")[1];
  image_name = mapgrid_id + "." + fileExtension;
  // upload the file to the /public/assets/img directory
  uploadedFile.mv(`public/assets/img/${mapid}/map/${image_name}`, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    let query =
      "INSERT INTO mapgrid (map_id,mapgrid_id,image_3d,image_cover,name,description) VALUES ('" +
      mapid +
      "','" +
      mapgrid_id +
      "','" +
      "" +
      "','" +
      image_name +
      "','" +
      "" +
      "','" +
      "" +
      "')";
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.redirect("/map/preview/" + mapid);
      res.end();
    });
  });
};

exports.editMap = (req, res) => {
  let mapid = req.params.map_id;
  let mapgrid_id = req.params.id;
  let save = req.body.save;
  let cancel = req.body.cancel;
  let add = req.body.add;
  let querymap =
    "SELECT * FROM `mapgrid` WHERE map_id = '" +
    mapid +
    "' AND mapgrid_id = '" +
    mapgrid_id +
    "'";
  let querypoi =
    "SELECT * FROM `poi` WHERE map_id = '" +
    mapid +
    "' AND mapgrid_id = '" +
    mapgrid_id +
    "'";

  if (cancel == "cancel") {
    res.redirect("/map/home");
  } else if (add == "add") {
    let title = req.body.poi_title;
    let description = req.body.poi_description;
    let uploadedFile = req.files.image3;
    let image_name = uploadedFile.name;
    let fileExtension = uploadedFile.mimetype.split("/")[1];
    image_name = title + "_POI" + "." + fileExtension;
    uploadedFile.mv(
      `public/assets/img/${mapid}/poi_image/${image_name}`,
      (err) => {
        if (err) {
          return res.status(500).send(err);
        }
        let queryinsertpoi =
          "INSERT INTO `poi` (map_id,mapgrid_id,image,title,description) VALUES ('" +
          mapid +
          "','" +
          mapgrid_id +
          "','" +
          image_name +
          "','" +
          title +
          "','" +
          description +
          "')";
        db.query(queryinsertpoi, (err, result) => {
          if (err) {
            return res.status(500).send(err);
          }
          db.query(querymap, (err, result3) => {
            db.query(querypoi, (err, result2) => {
              if (err) {
                return res.status(500).send(err);
              }
              res.render("edit-map.ejs", {
                title: "Edit  Map | " + mapgrid_id,
                map: result3[0],
                poi: result2,
                mapid: mapid,
                error: false,
                success: true,
              });
              res.end();
            });
          });
        });
      }
    );
  } else if (save == "save") {
    let map3d_name = req.body.map3d_name;
    let map_detail = req.body.map_detail;
    let poi_id = req.body.poi_id;
    let title = req.body.poi_title;
    let description = req.body.poi_description;
    let queryupdatemap =
      "UPDATE `mapgrid` SET `name` = '" +
      map3d_name +
      "', `description` = '" +
      map_detail +
      "' WHERE map_id = '" +
      mapid +
      "' AND mapgrid_id = '" +
      mapgrid_id +
      "'";
    let queryupdatepoi =
      "UPDATE `poi` SET `title` = '" +
      title +
      "', `description` = '" +
      description +
      "' WHERE poi_id = '" +
      poi_id +
      "'";
    db.query(queryupdatemap, (err, result) => {
      db.query(queryupdatepoi, (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        db.query(querymap, (err, result3) => {
          db.query(querypoi, (err, result2) => {
            if (err) {
              return res.status(500).send(err);
            }
            res.render("edit-map.ejs", {
              title: "Edit  Map | " + mapgrid_id,
              map: result3[0],
              poi: result2,
              mapid: mapid,
              error: false,
              success: true,
            });
            res.end();
          });
        });
      });
    });
  } else if (add == "error") {
    db.query(querymap, (err, result3) => {
      db.query(querypoi, (err, result2) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.render("edit-map.ejs", {
          title: "Edit  Map | " + mapgrid_id,
          map: result3[0],
          poi: result2,
          mapid: mapid,
          error: true,
          success: false,
        });
        res.end();
      });
    });
  } else if (save == "save2") {
    let map3d_name = req.body.map3d_name;
    let map_detail = req.body.map_detail;
    let poi_id = req.body.poi_id;
    let title = req.body.poi_title;
    let description = req.body.poi_description;
    let uploadedFile = req.files.image;
    let image_name = uploadedFile.name;
    let fileExtension = uploadedFile.mimetype.split("/")[1];
    image_name = mapgrid_id + "." + fileExtension;
    uploadedFile.mv(`public/assets/img/${mapid}/map/${image_name}`, (err) => {
      if (err) {
        return res.status(500).send(err);
      }
      let queryupdatemap =
        "UPDATE `mapgrid` SET `name` = '" +
        map3d_name +
        "', `description` = '" +
        map_detail +
        "', `image_cover` = '" +
        image_name +
        "' WHERE map_id = '" +
        mapid +
        "' AND mapgrid_id = '" +
        mapgrid_id +
        "'";
      let queryupdatepoi =
        "UPDATE `poi` SET `title` = '" +
        title +
        "', `description` = '" +
        description +
        "' WHERE poi_id = '" +
        poi_id +
        "'";
      db.query(queryupdatemap, (err, result) => {
        db.query(queryupdatepoi, (err, result) => {
          db.query(querymap, (err, result3) => {
            db.query(querypoi, (err, result2) => {
              if (err) {
                return res.status(500).send(err);
              }
              res.render("edit-map.ejs", {
                title: "Edit  Map | " + mapgrid_id,
                map: result3[0],
                poi: result2,
                mapid: mapid,
                error: false,
                success: true,
              });
              res.end();
            });
          });
        });
      });
    });
  } else if (save == "save3") {
    let map3d_name = req.body.map3d_name;
    let map_detail = req.body.map_detail;
    let poi_id = req.body.poi_id;
    let title = req.body.poi_title;
    let description = req.body.poi_description;
    let uploadedFile = req.files.image2;
    let image_name = uploadedFile.name;
    let fileExtension = uploadedFile.mimetype.split("/")[1];
    image_name = mapgrid_id + "_3d" + "." + fileExtension;
    uploadedFile.mv(
      `public/assets/img/${mapid}/image_3d/${image_name}`,
      (err) => {
        if (err) {
          return res.status(500).send(err);
        }
        let queryupdatemap =
          "UPDATE `mapgrid` SET `name` = '" +
          map3d_name +
          "', `description` = '" +
          map_detail +
          "', `image_3d` = '" +
          image_name +
          "' WHERE map_id = '" +
          mapid +
          "' AND mapgrid_id = '" +
          mapgrid_id +
          "'";
        let queryupdatepoi =
          "UPDATE `poi` SET `title` = '" +
          title +
          "', `description` = '" +
          description +
          "' WHERE poi_id = '" +
          poi_id +
          "'";
        db.query(queryupdatemap, (err, result) => {
          db.query(queryupdatepoi, (err, result) => {
            db.query(querymap, (err, result3) => {
              db.query(querypoi, (err, result2) => {
                if (err) {
                  return res.status(500).send(err);
                }
                res.render("edit-map.ejs", {
                  title: "Edit  Map | " + mapgrid_id,
                  map: result3[0],
                  poi: result2,
                  mapid: mapid,
                  error: false,
                  success: true,
                });
                res.end();
              });
            });
          });
        });
      }
    );
  } else if (save == "save4") {
    let map3d_name = req.body.map3d_name;
    let map_detail = req.body.map_detail;
    let poi_id = req.body.poi_id;
    let title = req.body.poi_title;
    let description = req.body.poi_description;
    let uploadedFile1 = req.files.image;
    let uploadedFile2 = req.files.image2;
    let image_name = uploadedFile1.name;
    let image_name2 = uploadedFile2.name;
    let fileExtension = uploadedFile1.mimetype.split("/")[1];
    let fileExtension2 = uploadedFile2.mimetype.split("/")[1];
    image_name = mapgrid_id + "." + fileExtension;
    image_name2 = mapgrid_id + "_3d" + "." + fileExtension2;
    uploadedFile1.mv(`public/assets/img/${mapid}/map/${image_name}`, (err) => {
      uploadedFile2.mv(
        `public/assets/img/${mapid}/image_3d/${image_name2}`,
        (err) => {
          if (err) {
            return res.status(500).send(err);
          }
          let queryupdatemap =
            "UPDATE `mapgrid` SET `name` = '" +
            map3d_name +
            "', `description` = '" +
            map_detail +
            "', `image_3d` = '" +
            image_name2 +
            "', `image_cover` = '" +
            image_name +
            "' WHERE map_id = '" +
            mapid +
            "' AND mapgrid_id = '" +
            mapgrid_id +
            "'";
          let queryupdatepoi =
            "UPDATE `poi` SET `title` = '" +
            title +
            "', `description` = '" +
            description +
            "' WHERE poi_id = '" +
            poi_id +
            "'";
          db.query(queryupdatemap, (err, result) => {
            db.query(queryupdatepoi, (err, result) => {
              db.query(querymap, (err, result3) => {
                db.query(querypoi, (err, result2) => {
                  if (err) {
                    return res.status(500).send(err);
                  }
                  res.render("edit-map.ejs", {
                    title: "Edit  Map | " + mapgrid_id,
                    map: result3[0],
                    poi: result2,
                    mapid: mapid,
                    error: false,
                    success: true,
                  });
                  res.end();
                });
              });
            });
          });
        }
      );
    });
  } else if (save == "save5") {
    let map3d_name = req.body.map3d_name;
    let map_detail = req.body.map_detail;
    let poi_id = req.body.poi_id;
    let title = req.body.poi_title;
    let description = req.body.poi_description;
    let uploadedFile = req.files.image3;
    let image_name = uploadedFile.name;
    let fileExtension = uploadedFile.mimetype.split("/")[1];
    image_name = title + "_POI" + "." + fileExtension;
    uploadedFile.mv(
      `public/assets/img/${mapid}/poi_image/${image_name}`,
      (err) => {
        if (err) {
          return res.status(500).send(err);
        }
        let queryupdatemap =
          "UPDATE `mapgrid` SET `name` = '" +
          map3d_name +
          "', `description` = '" +
          map_detail +
          "' WHERE map_id = '" +
          mapid +
          "' AND mapgrid_id = '" +
          mapgrid_id +
          "'";
        let queryupdatepoi =
          "UPDATE `poi` SET `title` = '" +
          title +
          "', `description` = '" +
          description +
          "', `image` = '" +
          image_name +
          "' WHERE poi_id = '" +
          poi_id +
          "'";
        db.query(queryupdatemap, (err, result) => {
          db.query(queryupdatepoi, (err, result) => {
            db.query(querymap, (err, result3) => {
              db.query(querypoi, (err, result2) => {
                if (err) {
                  return res.status(500).send(err);
                }
                res.render("edit-map.ejs", {
                  title: "Edit  Map | " + mapgrid_id,
                  map: result3[0],
                  poi: result2,
                  mapid: mapid,
                  error: false,
                  success: true,
                });
                res.end();
              });
            });
          });
        });
      }
    );
  } else if (save == "save6") {
    let map3d_name = req.body.map3d_name;
    let map_detail = req.body.map_detail;
    let poi_id = req.body.poi_id;
    let title = req.body.poi_title;
    let description = req.body.poi_description;
    let uploadedFile1 = req.files.image2;
    let uploadedFile2 = req.files.image3;
    let image_name = uploadedFile1.name;
    let image_name2 = uploadedFile2.name;
    let fileExtension = uploadedFile1.mimetype.split("/")[1];
    let fileExtension2 = uploadedFile2.mimetype.split("/")[1];
    image_name = mapgrid_id + "_3d" + "." + fileExtension;
    image_name2 = title + "_POI" + "." + fileExtension2;
    uploadedFile1.mv(
      `public/assets/img/${mapid}/image_3d/${image_name}`,
      (err) => {
        uploadedFile2.mv(
          `public/assets/img/${mapid}/poi_image/${image_name2}`,
          (err) => {
            if (err) {
              return res.status(500).send(err);
            }
            let queryupdatemap =
              "UPDATE `mapgrid` SET `name` = '" +
              map3d_name +
              "', `description` = '" +
              map_detail +
              "', `image_3d` = '" +
              image_name +
              "' WHERE map_id = '" +
              mapid +
              "' AND mapgrid_id = '" +
              mapgrid_id +
              "'";
            let queryupdatepoi =
              "UPDATE `poi` SET `title` = '" +
              title +
              "', `description` = '" +
              description +
              "', `image` = '" +
              image_name2 +
              "' WHERE poi_id = '" +
              poi_id +
              "'";
            db.query(queryupdatemap, (err, result) => {
              db.query(queryupdatepoi, (err, result) => {
                db.query(querymap, (err, result3) => {
                  db.query(querypoi, (err, result2) => {
                    if (err) {
                      return res.status(500).send(err);
                    }
                    res.render("edit-map.ejs", {
                      title: "Edit  Map | " + mapgrid_id,
                      map: result3[0],
                      poi: result2,
                      mapid: mapid,
                      error: false,
                      success: true,
                    });
                    res.end();
                  });
                });
              });
            });
          }
        );
      }
    );
  } else if (save == "save7") {
    let map3d_name = req.body.map3d_name;
    let map_detail = req.body.map_detail;
    let poi_id = req.body.poi_id;
    let title = req.body.poi_title;
    let description = req.body.poi_description;
    let uploadedFile1 = req.files.image;
    let uploadedFile2 = req.files.image3;
    let uploadedFile3 = req.files.image2;
    let image_name = uploadedFile1.name;
    let image_name2 = uploadedFile2.name;
    let image_name3 = uploadedFile3.name;
    let fileExtension = uploadedFile1.mimetype.split("/")[1];
    let fileExtension2 = uploadedFile2.mimetype.split("/")[1];
    let fileExtension3 = uploadedFile3.mimetype.split("/")[1];
    image_name = mapgrid_id + "." + fileExtension;
    image_name2 = mapgrid_id + "_3d" + "." + fileExtension2;
    image_name3 = title + "_POI" + "." + fileExtension3;
    uploadedFile1.mv(`public/assets/img/map/${mapid}/${image_name}`, (err) => {
      uploadedFile2.mv(
        `public/assets/img/${mapid}/image_3d/${image_name2}`,
        (err) => {
          uploadedFile3.mv(
            `public/assets/img/poi_image/${image_name3}`,
            (err) => {
              if (err) {
                return res.status(500).send(err);
              }
              let queryupdatemap =
                "UPDATE `mapgrid` SET `name` = '" +
                map3d_name +
                "', `description` = '" +
                map_detail +
                "', `image_3d` = '" +
                image_name2 +
                "', `image_cover` = '" +
                image_name +
                "' WHERE map_id = '" +
                mapid +
                "' AND mapgrid_id = '" +
                mapgrid_id +
                "'";
              let queryupdatepoi =
                "UPDATE `poi` SET `title` = '" +
                title +
                "', `description` = '" +
                description +
                "', `image` = '" +
                image_name3 +
                "' WHERE poi_id = '" +
                poi_id +
                "'";
              db.query(queryupdatemap, (err, result) => {
                db.query(queryupdatepoi, (err, result) => {
                  db.query(querymap, (err, result3) => {
                    db.query(querypoi, (err, result2) => {
                      if (err) {
                        return res.status(500).send(err);
                      }
                      res.render("edit-map.ejs", {
                        title: "Edit  Map | " + mapgrid_id,
                        map: result3[0],
                        poi: result2,
                        mapid: mapid,
                        error: false,
                        success: true,
                      });
                      res.end();
                    });
                  });
                });
              });
            }
          );
        }
      );
    });
  } else if (save == "save8") {
    let map3d_name = req.body.map3d_name;
    let map_detail = req.body.map_detail;
    let poi_id = req.body.poi_id;
    let title = req.body.poi_title;
    let description = req.body.poi_description;
    let uploadedFile1 = req.files.image;
    let uploadedFile2 = req.files.image3;
    let image_name = uploadedFile1.name;
    let image_name2 = uploadedFile2.name;
    let fileExtension = uploadedFile1.mimetype.split("/")[1];
    let fileExtension2 = uploadedFile2.mimetype.split("/")[1];
    image_name = mapgrid_id + "." + fileExtension;
    image_name2 = title + "_POI" + "." + fileExtension2;
    uploadedFile1.mv(`public/assets/img/map/${mapid}/${image_name}`, (err) => {
      uploadedFile2.mv(
        `public/assets/img/poi_image/${mapid}/${image_name2}`,
        (err) => {
          if (err) {
            return res.status(500).send(err);
          }
          let queryupdatemap =
            "UPDATE `mapgrid` SET `name` = '" +
            map3d_name +
            "', `description` = '" +
            map_detail +
            "', `image_cover` = '" +
            image_name +
            "' WHERE map_id = '" +
            mapid +
            "' AND mapgrid_id = '" +
            mapgrid_id +
            "'";
          let queryupdatepoi =
            "UPDATE `poi` SET `title` = '" +
            title +
            "', `description` = '" +
            description +
            "', `image` = '" +
            image_name2 +
            "' WHERE poi_id = '" +
            poi_id +
            "'";
          db.query(queryupdatemap, (err, result) => {
            db.query(queryupdatepoi, (err, result) => {
              db.query(querymap, (err, result3) => {
                db.query(querypoi, (err, result2) => {
                  if (err) {
                    return res.status(500).send(err);
                  }
                  res.render("edit-map.ejs", {
                    title: "Edit  Map | " + mapgrid_id,
                    map: result3[0],
                    poi: result2,
                    mapid: mapid,
                    error: false,
                    success: true,
                  });
                  res.end();
                });
              });
            });
          });
        }
      );
    });
  } else if (save == "save9") {
    let map3d_name = req.body.map3d_name;
    let map_detail = req.body.map_detail;
    let poi_id = req.body.poi_id;
    let title = req.body.poi_title;
    let description = req.body.poi_description;
    let uploadedFile1 = req.files.image;
    let uploadedFile2 = req.files.image2;
    let image_name = uploadedFile1.name;
    let image_name2 = uploadedFile2.name;
    let fileExtension = uploadedFile1.mimetype.split("/")[1];
    let fileExtension2 = uploadedFile2.mimetype.split("/")[1];
    image_name = mapgrid_id + "." + fileExtension;
    image_name2 = mapgrid_id + "_3d" + "." + fileExtension2;
    uploadedFile1.mv(`public/assets/img/map/${mapid}/${image_name}`, (err) => {
      uploadedFile2.mv(
        `public/assets/img/image_3d/${mapid}/${image_name2}`,
        (err) => {
          if (err) {
            return res.status(500).send(err);
          }
          let queryupdatemap =
            "UPDATE `mapgrid` SET `name` = '" +
            map3d_name +
            "', `description` = '" +
            map_detail +
            "', `image_cover` = '" +
            image_name +
            "', `image_3d` = '" +
            image_name2 +
            "' WHERE map_id = '" +
            mapid +
            "' AND mapgrid_id = '" +
            mapgrid_id +
            "'";
          let queryupdatepoi =
            "UPDATE `poi` SET `title` = '" +
            title +
            "', `description` = '" +
            description +
            "' WHERE poi_id = '" +
            poi_id +
            "'";
          db.query(queryupdatemap, (err, result) => {
            db.query(queryupdatepoi, (err, result) => {
              db.query(querymap, (err, result3) => {
                db.query(querypoi, (err, result2) => {
                  if (err) {
                    return res.status(500).send(err);
                  }
                  res.render("edit-map.ejs", {
                    title: "Edit  Map | " + mapgrid_id,
                    map: result3[0],
                    poi: result2,
                    mapid: mapid,
                    error: false,
                    success: true,
                  });
                  res.end();
                });
              });
            });
          });
        }
      );
    });
  }
};

exports.deleteMap = (req, res) => {
  let mapid = req.params.map_id;
  let map_id = req.params.id;
  let getImageQuery =
    "SELECT image_cover from `mapgrid` WHERE map_id = '" +
    mapid +
    "' AND mapgrid_id = '" +
    map_id +
    "'";
  let deleteQuery =
    "DELETE FROM mapgrid WHERE map_id = '" +
    mapid +
    "' AND mapgrid_id = '" +
    map_id +
    "'";

  db.query(getImageQuery, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    let image = result[0].image_cover;

    // fs.unlink(`public/assets/img/map/${image}`, (err) => {
    //   if (err) {
    //     return res.status(500).send(err);
    //   }
    db.query(deleteQuery, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.redirect("/map/preview/" + mapid);
    });
  });
  // });
};

exports.deletePOI = (req, res) => {
  let poi_id = req.params.poi_id;
  let mapid = req.params.map_id;
  let mapgrid_id = req.params.id;
  let deleteQuery = "DELETE FROM poi WHERE poi_id = '" + poi_id + "'";

  db.query(deleteQuery, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.redirect("/map/edit/" + mapid + "/" + mapgrid_id);
  });

  // });
};
