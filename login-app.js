const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mustache = require('mustache-express')
const expressSession = require('express-session');

app.listen(3000, function() {
  console.log("here I go! zooom!~")
})

app.engine('mustache', mustache())
app.set('view engine', 'mustache');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(expressSession({
  secret: 'hubbawubba',
  resave: false,
  saveUninitialized: true
}))

var loggedIn= false

var userArray = [{
  username: "bob1",
  password: "1234",
}, {
  username: "jill1",
  password: "pass",
}];

app.get('/', function(req, res) {
  if (loggedIn === false) {
      res.redirect("/login")
    } else{
  res.render("home")
  }
})

app.get('/login', function(req, res) {
  res.render("login", {
    pageTitle: "Login!",
  })
})

app.post('/logMeIn', function(req, res) {
  let nameEntry = req.body.username;
  let passEntry = req.body.password;
  console.log("username: " + nameEntry + " " + "password: " + passEntry);
  for (i = 0; i < userArray.length; i++) {
    if (nameEntry === userArray[i].username) {
      console.log("USERNAME MATCH")
      if (passEntry === userArray[i].password) {
        console.log("PASSWORD MATCH")
        loggedIn= true
        res.render('home', {
          nameEntry: userArray[i].username
        })
      }
    }
  }
  res.redirect('/')
})
