var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port',9988 );

app.get('/',function(req,res){
  var qParams = [];
    for (var p in req.query){
      qParams.push({'name':p,'value':req.query[p]})
    }
    var context = {};
    context.dataList = qParams;
    context.requestType = 'Get';
    res.render('request', context);
});

app.post('/',function(req,res){
  var qParams = [];
    for (var p in req.body){
      qParams.push({'name':p,'value':req.body[p]})
    }
    var context = {};
    context.dataList = qParams;
    context.requestType = 'Post';   
    res.render('request', context);
});

app.use(function(req, res){
  res.status(404);
  res.rendor('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on flip3.engr.oregonstate.edu/' + app.get('port') + '; press Ctrl-C to terminate.');
});
