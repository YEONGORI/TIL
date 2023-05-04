var mysql = require('mysql');
var connection = mysql.createConnection({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    password: '4346',
    database: 'tutorial'
});

module.exports = {getList(callback) {
    connection.query('SELECT idx, creator_id, title, hit FROM board', (err, rows, fields) => {
        if (err) throw err;
        callback(rows);
    })
}}