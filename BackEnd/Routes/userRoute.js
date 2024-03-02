const express = require("express");
const userController = require("./../Controllers/userController");

const router = express.Router();

router.route("/").get();
router.route("/login").post();
router.route("/register").post();
router.route("/profile").post();
router.route("/profile").put();

module.exports = router;
