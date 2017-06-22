const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mustache = require('mustache-express')

app.listen(3000,function(){
  console.log("here I go! zooom!~")
})

app.engine('mustache', mustache() )
app.set('view engine', 'mustache');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req,res){
    res.render("home",{
      pageTitle: "Home!",
    })
})
