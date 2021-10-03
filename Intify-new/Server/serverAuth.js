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

dbConnect.Connect();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const refreshTokens = [];

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
        const user = { username: username };
        const accessToken = generateToken(user);
        const refreshToken = jwt.sign(user, "refresh-bear.");
        refreshTokens.push(refreshToken);
        console.log(accessToken);
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
    // passport.authenticate('local', {session: false})
  });
});

app.post("/logout", (req, res) => {
  const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((refToken) => refToken !== refreshToken);
  res.sendStatus(200);
});

app.post("/refreshToken", (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) res.sendStatus(403);
  jwt.verify(refreshToken, "refresh-bear.", (err, user) => {
    if (err) return res.sendStatus(403);
    const newuser = { name: user.name };
    const accessToken = generateToken(newuser);
    res.json({ accessToken: accessToken });
  });
});

function generateToken(user) {
  console.log(user);
  return jwt.sign(user, "bear.", { expiresIn: "10m" });
}

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
