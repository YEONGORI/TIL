const createError = require('http-errors');
const express = require('express');
const cors = require("cors");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const authRouter = require('./routes/auth_routes');
const usersRouter = require('./routes/user_routes');

const app = express();
const corsOptions = {
  origin: "http://localhost:8080"
};
const db = require("./models/index");
const dbConfig = require('./config/db_config');
const Role = require('./models/role_model');
const role = db.role();

db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=> {
  console.log("몽고DB 연결 완료");
  Role.estimatedDocumentCount((err, count) => {
    if (!err & count === 0) {
      new Role({
        name: "admin"
      }).save((err) => {
        if (err)
          console.log("admin 생성 오류", err);
        else
          console.log("role collection에 admin추가 완료")
      });
      new Role({
        name: "manager"
      }).save((err) => {
        if (err)
          console.log("manager 생성 오류", err);
        else
          console.log("role collection에 manager추가 완료")
      });
      new Role({
        name: "employee"
      }).save((err) => {
        if (err)
          console.log("employee 생성 오류", err);
        else
          console.log("role collection에 employee추가 완료")
      })
    }
  })
}).catch((err) => {
  console.error("몽고DB 연결 실패", err);
  process.exit();
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', authRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
