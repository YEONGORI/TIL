var express = require('express');
var router = express.Router();
var model = require('../models');

module.exports = async (req, res) => {
    let result = await model.boards.findAll({}).catch((err) => console.log(err));
    console.log(result);
    res.render('index', {title: 'test', rows: result});
}

// var mysql = require('mysql');
// var pool = mysql.createPool({
//   connectionLimit: 5,
//   host: 'localhost',
//   user: 'root',
//   password: '4346',
//   database: 'tutorial'
// });

// router.get('/', function(req, res, next) {
//   pool.getConnection(function(err,connection) {
//     connection.query('SELECT * FROM board', function(err, rows) {
//       if (err) console.error("err: " + err);
//       console.log("rows: "+ JSON.stringify(rows));

//       res.render('index', {title: 'test', rows: rows});
//       connection.release();
//     });
//   });
// });

// module.exports = router;