const verfiySignUp = require("../middleware/verfiy_signup")
const controller = require("../controllers/auth_controller");

module.exports = (app) => {
    console.log("DONE");
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/auth/signup", [
        verfiySignUp.checkDuplicatedUserid,
        verfiySignUp.checkRoleExisted
    ], controller.signup);

    app.post("/api/auth/signin", controller.signin);
}