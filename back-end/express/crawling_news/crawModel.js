const mysql = require("mysql");
const connection = mysql.createConnection({
  connectionLimit: 10,
  // host: "127.0.0.1",
  // user: "root",
  // password: "1234",
  // database: "test",
  host: "db.typetest.net",
  user: "db",
  password: "1234",
  database: "finance",
  port: "3333",
});

module.exports = {
  insertData(datas) {
    const sql =
      "INSERT INTO News(NEWS_LINK, NEWS_IMG, NEWS_HEADLINE, NEWS_SUMMARY, NEWS_PRESS, NEWS_DATE) VALUES(?,?,?,?,?,?)";
    connection.query(sql, datas, (err) => {
      if (err) console.error("err: " + err);
    });
  },
};
