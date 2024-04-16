const express = require("express");
const userController = require("./../Controllers/userController");
const authController = require("./../Controllers/authController");

const router = express.Router();

router.route("/").get(userController.getUsers);
router.route("/:id").get(userController.getUserById);
router.put("/:userId/chats", userController.updateUserChats);
router.route("/login").post(authController.login);
router.route("/register").post(authController.signup);
router.route("/logout").get(authController.logout);
router.route("/profile").post();
router.route("/profile").put();

module.exports = router;
