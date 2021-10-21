const Music = require("../Model/Music");
const { arrayObjMongoose } = require("../config/mongooseConvert");
const User = require("../Model/User");
const { findOne } = require("../Model/User");
const fs = require("fs");
const path = require("path");

class MusicController {
  editMusic(req, res, next) {
    User.findOne({ username: req.user.name }, (err, user) => {
      if (err)
        return res.json({
          status: 404,
          descp: err,
        });
      if (!user)
        return res.json({
          status: 404,
        });
      else {
        Music.updateOne({ _id: req.params._id }, req.body)
          .then(
            res.json({
              status: 200,
              descp: "Chinh sua thanh cong",
            })
          )
          .catch((error) =>
            res.json({
              status: 404,
              descp: error,
            })
          );
      }
    });
  }

  //GET ListMusic
  showListMusic(req, res, body) {
    Music.find({})
      .then((music) => res.json(music))
      .catch((error) => next(error));
  }

  //GET FormAdd
  formAddMusic(req, res, body) {
    res.render("uploadNewSong");
  }

  //POST AddNewMusic
  addNewMusic(req, res, body) {
    User.findOne({ username: req.user.username }, (err, user) => {
      if (err)
        return res.json({
          status: 404,
          descp: err,
        });
      const newMusic = req.body;
      newMusic.idUser = user._id;
      newMusic.img =
        "http://10.0.2.2:3002/" +
        req.files.img[0].path.split("\\").splice(1).join("/");
      newMusic.mp3 =
        "http://10.0.2.2:3002/" +
        req.files.mp3[0].path.split("\\").splice(1).join("/");
      const music = new Music(newMusic);
      music
        .save()
        .then(
          res.json({
            status: 200,
            descp: "create new music success",
          })
        )
        .catch((error) =>
          res.json({
            status: 404,
            descp: error,
          })
        );
    }
    );
}

  getFileImg(req, res, body) {
    const  options = {
      root : path.join(__dirname + "/../public/uploads/imgSong/")
    }

    console.log(options);

    res.sendFile(req.params.name, options, function (err) {
      if (err) {
        next(err);
      } else {
        console.log("Sent:", req.params.name);
      }
    });
  }
}

module.exports = new MusicController();
