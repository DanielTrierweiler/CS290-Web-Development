var express = require("express");
var mysql = require("mysql");

var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'mysql.eecs.oregonstate.edu',
  user            : 'cs290_trierwed',
  password        : 'W_illson88.',
  database        : 'cs290_trierwed'
});

pool.query("DROP TABLE IF EXISTS workouts", function(err){
  var createString = "CREATE TABLE workouts(" +
  "id INT PRIMARY KEY AUTO_INCREMENT," +
  "name VARCHAR(255) NOT NULL," +
  "reps INT," +
  "weight INT," +
  "lbs BOOLEAN," +
  "date  DATE)";
  pool.query(createString, function(err) {
    if (err) {
      console.log(err);
    }
  });
});

var app = express();
var handlebars = require("express-handlebars").create({ defaultLayout:"main" });
var bodyParser = require("body-parser");

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", 8888);
app.use(express.static("public"));
app.use(bodyParser.json());

//render home page
app.get('/', function(req, res) {
  res.render("home");
});

//reset table and render home page
app.get('/reset-table', function(req, res, next) {
  var context = {};
  pool.query("DROP TABLE IF EXISTS workouts", function(err){
    var createString = "CREATE TABLE workouts(" +
    "id INT PRIMARY KEY AUTO_INCREMENT," +
    "name VARCHAR(255) NOT NULL," +
    "reps INT," +
    "weight INT," +
    "lbs BOOLEAN," +
    "date  DATE)";
    pool.query(createString, function(err) {
      if (err) {
        console.log(err);
      }
      res.render("home", context);
    });
  });
});

//get table and return it
app.get('/get-table', function(req, res, next) {
  var context = {};
  pool.query("SELECT * FROM workouts",  function(err, rows, fields) {
    if(err) {
      next(err);
    }
    context.results = JSON.stringify(rows);
    res.send(context.results);
  });
});  

//insert new row to database and return it
app.get('/insert', function(req, res, next) {
  var context = {};
  var query = req.query;
  pool.query("INSERT INTO workouts (`name`,`reps`,`weight`,`lbs`,`date`) VALUES (?,?,?,?,?)", 
                                    [query.name, query.reps, query.weight, query.lbs, query.date], 
                                    function(err, result) {
    if(err) {
      next(err);
      return;
    }
    pool.query('SELECT * FROM workouts WHERE id = ' + result.insertId, function(err, row, fields) {
      if(err) {
        next(err);
        return;
      }
      context.results = JSON.stringify(row);
      res.send(context.results); 
    });
  });
});

//update row in database and return it
app.post('/update', function(req, res, next) {
  var context = {};
  var body = req.body;
  pool.query('UPDATE workouts SET name=?, reps=?, weight=?, lbs=?, date=? WHERE id = ' + body.id,
                             [body.name, body.reps, body.weight, body.lbs, body.date],
                             function(err, row, fields) {
    if(err) {
      next(err); 
      return;
    }
    context.results = JSON.stringify(row);
    res.send(context.results);
  });
});  


//delete row from database 
app.post('/delete', function(req, res, next) {
  var context = {};
  pool.query('DELETE FROM workouts WHERE id=' + req.body.id, function(err, fields) {
    if (err) {
      next(err);
      return;
    }
    res.send(context);
  });
});

app.use(function(req, res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get("port"), function() {
  console.log('Server started on http://flip3.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});
