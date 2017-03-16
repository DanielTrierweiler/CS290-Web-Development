var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'mysql.eecs.oregonstate.edu',
  user            : 'cs290_trierwed',
  password        : 'W_illson88.',
  database        : 'cs290_trierwed'
});

module.exports.pool = pool;
