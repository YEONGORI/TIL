const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const fs = require("fs");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

const commonPath = "./public/upload";
let totalFile = "";

fs.readdir(commonPath, (err, FileList1) => {
    for (let i = 0; i < FileList1.length; i++) {
        if (FileList1[i].search(".dwg") == -1) {
            let newPath = path.join(commonPath + "/" + FileList1[i]);
            fs.readdir(newPath, (err, FileList2) => {
                for (let j = 0; j < FileList2.length; j++) {
                    if (FileList2[j].search(".dwg") == -1) {
                        let newPath2 = path.join(newPath + "/" + FileList2[j]);
                        fs.readdir(newPath2, (err, FileList3) => {
                            for (let k = 0; k < FileList3.length; k++) {
                                if (FileList3[k].search(".dwg") == -1) {
                                    let newPath3 = path.join(
                                        newPath2 + "/" + FileList2[j]
                                    );
                                    fs.readdir(newPath3, (err, FileList4) => {
                                        for (
                                            let x = 0;
                                            x < FileList4.length;
                                            x++
                                        ) {
                                            if (
                                                FileList4[x].search(".dwg") ==
                                                -1
                                            ) {
                                            } else {
                                                let tmp3 =
                                                    newPath3 +
                                                    "/" +
                                                    FileList4[x];
                                                totalFile =
                                                    totalFile + "\n" + tmp3;
                                            }
                                        }
                                    });
                                } else {
                                    let tmp3 = newPath2 + "/" + FileList3[k];
                                    totalFile = totalFile + "\n" + tmp3;
                                }
                            }
                        });
                    } else {
                        let tmp2 = newPath + "/" + FileList2[j];
                        totalFile = totalFile + "\n" + tmp2;
                    }
                }
            });
        } else {
            let tmp = commonPath + "/" + FileList1[i];
            totalFile = totalFile + "\n" + tmp;
        }
    }
});
setTimeout(() => {
    console.log(totalFile);
}, 2000);

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
