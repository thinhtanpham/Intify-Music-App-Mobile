const express = require("express");
const User = require("./Model/User");
const bcrypt = require("bcryptjs");
const moongose = require("mongoose");
const app = express();
const PORT = 5000;
const dbConnect = require("./DB/dbConnect");
const session = require("express-session");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const authenticateToken = require("./config/authenticate");
const RefToken = require("./Model/RefToken");
const { deleteOne } = require("./Model/User");

dbConnect.Connect();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post("/account/checkLogin", (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ username: username }, (err, user) => {
    if (err) return res.json({ message: { msgBody: err, msgError: true } });
    if (!user)
      return res.status(500).json({
        message: {
          msgBody: "username hoac password khong dung",
          msgError: true,
        },
      });
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.json({ message: { msgBody: err, msgError: true } });
      if (isMatch) {
        const userLog = { username: username };
        const accessToken = generateToken(userLog);
        const refreshToken = jwt.sign(userLog, "refresh-bear.");
        const ref= {
          idUser: user._id,
          refToken: refreshToken
        }
        RefToken.findOne({idUser: user._id})
        .then((refToken) =>{ 
          if(refToken) RefToken.updateOne({idUser: user._id}, ref)
          else {
            const refTokenDB = new RefToken({
              idUser: user._id,
              refToken: refreshToken,
            });
            refTokenDB.save().catch((error) => console.log(error));
          }
        })
        .catch(error => console.log(error))
        return res.status(200).json({
          message: {
            msgBody: "Dang nhap thanh cong",
            accessToken: accessToken,
            refreshToken: refreshToken,
            msgError: false,
          },
        });
      } else
        return res.status(500).json({
          message: {
            msgBody: "username hoac password khong dung",
            msgError: true,
          },
        });
    });
  });
});

app.post("/logout", (req, res) => {
  const refreshToken = req.body.token;
  RefToken.findOneAndDelete({refToken: refreshToken})
  .then(() => res.status(200).json({
    "msg":"Logout thanh cong"
  }))
  .catch(() => res.status(400).json({
    "msg":"Loi"
  }))
});

app.post("/refreshToken", (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken)  {res.status(403)}
  RefToken.findOne({refToken: refreshToken})
  .then((reftoken) => {
    jwt.verify(reftoken.refToken, "refresh-bear.", (err, user) => {
      if (err) return res.status(403);
      const newuser = { username: user.username };
      const accessToken = generateToken(newuser);
      res.json({ accessToken: accessToken });
    });
  })
  .catch(() => res.status(403).json({
    message: "Don't have refToken"
  }))
});

function generateToken(user) {
  return jwt.sign(user, "bear.", { expiresIn: "10m" });
}

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
