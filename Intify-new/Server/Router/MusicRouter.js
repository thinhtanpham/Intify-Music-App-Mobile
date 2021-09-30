const express = require("express");
const MusicController = require("../Controller/MusicController");
const Music = require("../Model/Music");
const router = express.Router();
const multer = require("multer");
const { isImg, isSong } = require("../config/compareFile");
const jwt = require('jsonwebtoken')
const authenticateToken = require('../config/authenticate')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (isImg(file.fieldname)) {
      cb(null, "public/uploads/imgSong");
    } else if (isSong(file.fieldname)) {
      cb(null, "public/uploads/mp3");
    }
  },
  filename: function (req, file, cb) {
    const fileType = file.originalname.split(".");
    if (isImg(file.fieldname)) {
      cb(null, req.body.nameSong.split(' ').join('-') + "-" + req.body.nameArtist.split(' ').join('-') +".jpg");
    } else if (isSong(file.fieldname)) {
      cb(null, req.body.nameSong.split(' ').join('-') + "-" + req.body.nameArtist.split(' ').join('-') +".mp3");
    }
  },
});

const upload = multer({ storage: storage });
const newSingUpload = upload.fields([{ name: "img" }, { name: "mp3" }]);

// router.get("/uploads/imgSong/:name", MusicController.getFileImg);
router.get("/", MusicController.showListMusic);
router.get("/add", MusicController.formAddMusic);
router.post("/add/newSong",authenticateToken, newSingUpload, MusicController.addNewMusic);
router.put("/editMusic/:_id",authenticateToken, MusicController.editMusic)

module.exports = router;
