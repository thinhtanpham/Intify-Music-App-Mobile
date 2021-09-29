const User = require("../Model/User");
const passport = require("passport");
const bcrypt= require('bcryptjs')
const flash= require('connect-flash');
const jwt = require("jsonwebtoken");
const Music = require("../Model/Music");


class UserName {

  // formLogin(req, res, next) {
  //   res.render("login");
  // }

  // formCreate(req, res, next) {
  //   res.render("create");
  // }
  

  // login(req, res, next) {
  //   const {username, password} = req.body
  //   User.findOne({username: username},(err, user) =>{
  //     if(err) return res.json({message:{msgBody: err, msgError:true}})
  //     if(!user) return res.status(500).json({ message:{msgBody: "username hoac password khong dung", msgError:true}})
  //     bcrypt.compare(password, user.password, (err, isMatch)=>{
  //       if(err) return res.json({message:{msgBody: err, msgError:true}})
  //       if(isMatch) {
  //         const user = {name: username}
  //         const accessToken = generateToken(user)
  //         console.log(accessToken)
  //         return res.status(200).json({ message:{msgBody: "Dang nhap thanh cong",accessToken: accessToken, msgError:false}})
  //       }
  //       else return res.status(500).json({ message:{msgBody: "username hoac password khong dung", msgError:true}})
  //     }
  //   )
  //   // passport.authenticate('local', {session: false})
  // })}

    create(req, res, next) { 
    console.log(req.body)
    const { username, password, repassword, nameApp } = req.body;
    console.log("dang dang ky")
    User.findOne({ username: username })
    .then((user) => {
      if (user) {
        console.log("cos user roi ne")
        res.status(400).json({
          message:{msgBody: "Da co nguoi dung", msgError:true}
        })
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
              console.log("dang ky thanh cong ne")
              res.json({
                  status: 200,
                  descp: "create success",
                })
                .catch((error) => next(error));
            });
          })
        );
      }
    })
    .catch(error => res.status(500).json({
      message:{msgBody: "error", msgError:true}
    }))
  }

  myList(req,res,next) {
    User.findOne({username: req.user.name}, (err,user) =>{
      if(err) return res.json({
        status: 404,
        descp: err,
      })
      if(user){
      Music.find({idUser: user._id}, (err, music) =>{
        if(err) return res.json({
          status: 404,
          descp: err,
        })
        if(!music) return res.json({
          status: 200,
          descp: "Chua dang bai nao",
        })
        else return res.json({
          status: 200,
          descp: "your list",
          music: music
        })
      })}
    })  
  }

  
}

function generateToken(user) {
      return jwt.sign(user, 'bear.', {expiresIn:'20s'})
    }


module.exports = new UserName();
