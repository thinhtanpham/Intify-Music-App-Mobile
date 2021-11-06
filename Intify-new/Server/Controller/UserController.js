const User = require("../Model/User");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const flash = require("connect-flash");
const jwt = require("jsonwebtoken");
const Music = require("../Model/Music");

class UserName {
  create(req, res, next) {
    const { username, password, repassword, nameApp } = req.body;
    User.findOne({ username: username })
      .then((user) => {
        if (user) {
          res.status(400).json({
            message: { msgBody: "Da co nguoi dung", msgError: true },
          });
        } else {
          const newUser = new User({
            username,
            password,
            nameApp,
          });
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              newUser.password = hash;
              newUser.save().then(() => {
                res
                  .json({
                    status: 200,
                    descp: "create success",
                  })
                  .catch((error) => next(error));
              });
            })
          );
        }
      })
      .catch((error) =>
        res.status(500).json({
          message: { msgBody: "error", msgError: true },
        })
      );
  }

  userInfo(req, res, next) {
    User.findOne({ username: req.user.username }, (err, user) => {
      if (err)
        return res.status(404).json({
          descp: err,
        });
      if (user)
        return res.status(200).json({
          user: {
            username: user.username,
            nameApp: user.nameApp,
            dayCreate: user.createdAt,
          },
        });
      else
        return res.status(500).json({
          user: null,
        });
    });
  }

  myList(req, res, next) {
    User.findOne({ username: req.user.username }, (err, user) => {
      if (err)
        return res.json({
          status: 404,
          descp: err,
        });
      if (user) {
        Music.find({ idUser: user._id }, (err, music) => {
          if (err)
            return res.json({
              status: 404,
              descp: err,
            });
          if (!music)
            return res.json({
              status: 200,
              descp: "Chua dang bai nao",
            });
          else
            return res.json({
              status: 200,
              descp: "your list",
              music: music,
            });
        });
      }
    });
  }

  newImgArtist(req, res, next) {}
}

module.exports = new UserName();
