const express = require("express");

const router = express.Router();

const usersController = require("../controllers/users.controller");

router.get("/login", usersController.getloginpage);
router.post("/auth", usersController.getlogin);
router.get("/logout", usersController.getlogout);

module.exports = router;
