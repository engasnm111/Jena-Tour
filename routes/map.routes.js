const fs = require("fs");
const express = require("express");

const router = express.Router();

const MapController = require("../controllers/map.controller");

router.get("/addmap/:map_id/:id", MapController.addMapPage);
router.get("/preview/:id", MapController.previewMapPage);
router.get("/edit/:map_id/:id", MapController.editMapPage);
router.get("/delete/:map_id/:id", MapController.deleteMap);
router.get("/deletepoi/:poi_id/:map_id/:id", MapController.deletePOI);
router.get("/home", MapController.HomeMapPage);
router.get("/addproject/:id", MapController.addprojectPage);

router.post("/addmap/:map_id/:id", MapController.addMap);
router.post("/edit/:map_id/:id", MapController.editMap);
router.post("/addproject/:id", MapController.addproject);

module.exports = router;
