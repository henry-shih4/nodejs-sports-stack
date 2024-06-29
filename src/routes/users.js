const express = require("express");
const router = express.Router();


const { createUser, getUserByID } = require("../controllers/userController");

router.route("/register").post(createUser);
router.route("/users/:id").get( getUserByID);

module.exports = router;
