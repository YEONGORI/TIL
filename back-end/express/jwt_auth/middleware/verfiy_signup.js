const db = require("../models/index");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicatedUserid = (req, res, next) => {
    User.findOne({
        user_id: req.body.user_id
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return ;
        }
        if (user) {
            res.status(400).send({message: "Failed! Username is already in use!"});
            return ;
        }
        next();
    })
}

checkRoleExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: `Role ${req.body.roles[i]} 이(가) 존재하지 않습니다.`
                })
                return;
            }
        }
    }
}


const verfiySignUp = {
    checkDuplicatedUserid,
    checkRoleExisted
};

module.exports = verfiySignUp;