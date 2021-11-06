const express = require("express");
const UserController = require("../Controller/UserController");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const LocalStrategy = require('passport-local').Strategy;
const authenticateToken = require('../config/authenticate')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (isImg(file.fieldname)) {
        cb(null, "public/uploads/imgArtist");
        } 
    },
    filename: function (req, file, cb) {
        if (isImg(file.fieldname)) {
        cb(null, req.body.nameSong.split(' ').join('-') + "-" + req.body.nameArtist.split(' ').join('-') +".jpg");
        }
    },
    });

const upload = multer({ storage: storage });
const newImgArtistUpload = upload.fields({ name: "imgArtist"});

router.post("/created/newAccount", UserController.create);
router.get("/",authenticateToken , UserController.userInfo);
router.get("/mylist",authenticateToken , UserController.myList)
router.post("/add/imgArtist", newImgArtistUpload, UserController.newImgArtist)

module.exports = router;
