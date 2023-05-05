// var mysql = require("mysql");
// var connection = mysql.createConnection({
//   connectionLimit: 5,
//   host: "localhost",
//   user: "root",
//   password: "4346",
//   database: "tutorial",
// });

// module.exports = {
//   insertData(datas, callback) {
//     var sql =
//       "INSERT INTO board(creator_id, title, content, image, passwd) VALUES(?,?,?,?,?)";
//     connection.query(sql, datas, function (err, rows) {
//       if (err) console.error("err: " + err);
//       console.log("rows: " + JSON.stringify(rows));
//       callback();
//     });
//   },
// };