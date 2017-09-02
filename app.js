var express = require("express");
var hbs     = require("hbs");


var app = express();
const port = process.env.PORT || 5000;

hbs.registerPartials(__dirname + '/views/partials');

app.set("view engine", "hbs");

app.use(express.static(__dirname + '/public'));
app.use(function(req,res,next){
  console.log("requested method: " + req.method + " to: " + req.originalUrl);
  next();
})

app.get("/asteroids", function(req,res){
  res.redirect("007AsteroidGame/index.html");
});

app.get("*",function(req,res){
  res.render("home");
})

app.listen(port,function(){
  console.log(`Server is listening at port ${port}`);
})
