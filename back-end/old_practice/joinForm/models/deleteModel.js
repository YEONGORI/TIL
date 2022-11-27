let mysql = require('mysql');
let connection = mysql.createConnection({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    password: '4346',
    database: 'tutorial'
});

module.exports = {deleteData(idx, callback) {
    connection.query('DELETE FROM board WHERE idx=?', [idx], (err, result) => {
        if (err) throw err;
        callback();
    })
}}