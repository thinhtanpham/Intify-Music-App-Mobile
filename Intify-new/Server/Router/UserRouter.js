const express = require("express");
const UserController = require("../Controller/UserController");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const authenticateToken = require('../config/authenticate')


router.post("/created/newAccount", UserController.create);
router.get("/",authenticateToken , UserController.userInfo);
router.get("/mylist",authenticateToken , UserController.myList)
// router.delete("/logout", UserController.logout)

module.exports = router;
