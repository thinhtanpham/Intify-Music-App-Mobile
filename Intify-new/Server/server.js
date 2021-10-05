const express = require('express')
const app = express()
const https= require('https')
const dbConnect= require('./DB/dbConnect')
const port = 3002
const router = require('./Router/index')
const exphbs  = require('express-handlebars')
const path = require('path')
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
const methodOverride= require('method-override')
const LocalStrategy = require('passport-local').Strategy;
const fs= require('fs')

// const httpsServer= https.createServer({
//   key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
//   cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
// }, app)

dbConnect.Connect()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}));

 app.use(express.static(path.join(__dirname, "public")));

app.use(flash())

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}))

// app.use(passport.initialize());
// app.use(passport.session());
// require('./config/checkLogin')(passport);

app.use(express.json())

app.engine('handlebars', exphbs({
  partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'handlebars');


app.use(methodOverride("_method"));
router(app)

// httpsServer.listen(port, () => {
//   console.log(`Example app listening at https://localhost:${port}`)
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})