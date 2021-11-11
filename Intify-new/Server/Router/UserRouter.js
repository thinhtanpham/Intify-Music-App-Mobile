const express = require("express");
const UserController = require("../Controller/UserController");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const LocalStrategy = require('passport-local').Strategy;
const authenticateToken = require('../config/authenticate')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/imgArtist");
    },
    filename: function (req, file, cb) {
        cb(null, req.user.username+".jpg");
    },
    });
const newImgArtistUpload = multer({ storage: storage });

router.post("/created/newAccount", UserController.create);
router.get("/",authenticateToken , UserController.userInfo);
router.get("/mylist",authenticateToken , UserController.myList)
router.post("/add/imgArtist",authenticateToken, newImgArtistUpload.single("imgArtist") , UserController.newImgArtist)

module.exports = router;
