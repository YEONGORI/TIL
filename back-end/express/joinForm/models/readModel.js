var mysql = require('mysql');
var connection = mysql.createConnection({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    password: '4346',
    database: 'tutorial'
});

module.exports = {getData(idx, callback) {
    connection.query('SELECT idx, creator_id, title, content, image, hit FROM board WHERE idx=?;', [idx], (err, row, fields) => {
        if (err) throw err;
        callback(row);
    });
}}