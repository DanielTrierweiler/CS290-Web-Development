var express = require("express");

var app = express();
var request = require("request");
var handlebars = require("express-handlebars").create({defaultLayout:"main"});
var session = require("express-session");
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({secret: "password"}));

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", 9955);
	
var key = "953e8fa143c4b09c24ec63df279ec9fa";

app.get('/',function(req,res,next){
  var context = {};
  //if there is no session go to the main page
  if(!req.session.name){
    res.render('newSession', context);
    return;
  }
  context.name = req.session.name;
  context.toDoCount = req.session.toDo.length || 0;
  context.toDo = req.session.toDo || [];
  console.log(context.toDo);
  res.render('toDo',context);
});

app.post('/',function(req,res){
  var context = {};

  if(req.body['New List']){
    req.session.name = req.body.name;
    req.session.toDo = [];
    req.session.curId = 0;
    display(req, res, context);
  }
  //If there is no session, go to the main page
  if(!req.session.name){
    res.render('newSession', context);
    return;
  }

  if(req.body['Add Item']){
    var apiWeather;
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + req.body.city + "&units=imperial&appid=" + key;
    var options = {
      url: url,
      method: "GET",
      headers: {"Content-Type": "application/x-www-form-urlencoded"}
    };
    request(options, function(err, response, body) {
      if (!err && response.statusCode ==  200) {
        apiWeather = JSON.parse(body).main.temp;
        req.session.toDo.push({"name":req.body.name, "city":req.body.city, "temp":req.body.temp, "api":apiWeather, "id":req.session.curId});
        req.session.curId++;
        display(req, res, context);
     }
      else {
        console.log(response.statusCode);
      }
    });
  }

  if(req.body['Done']){
    req.session.toDo = req.session.toDo.filter(function(e){
      return e.id != req.body.id;
    })
    display(req, res, context);
  }

});

function display(req, res ,context) {
  context.name = req.session.name;
  context.toDoCount = req.session.toDo.length;
  context.toDo = req.session.toDo;
  console.log(context.toDo);
  res.render('toDo',context);
}

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Session started on http://flip3.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});
