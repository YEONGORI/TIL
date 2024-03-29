const jwt = require("jsonwebtoken");
const config = require("../config/auth_config");
const db = require("../models/index");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({message: "토큰이 없습니다."});
    }

    jwt.verify(token, config.secret, (err, decoded) => { // decoded(callback)가 제공되었으므로 비동기 적으로 동작한다.
        // signature, audience or issuer가 유효한 경우 decoding된 payload를 사용해 callback을 호출한다.
        if (err) {
            return res.status(401).send({message: "인증에 실패했습니다."});
        }
        req.user_id = decoded.id;
        next();
    })
};

isAdmin = (req, res, next) => {
    User.findById(req.user_id).exec((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return ;
        }

        Role.find({_id: {$in: user.roles}}, (err, roles) => {
            if (err) {
                res.status(500).send({message: err});
                return ;
            }

            for (let i=0; i<roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }

            res.status(403).send({message: "Require Admin Role!"});
            return;
        })
    })
}

isManager = (req, res, next) => {
    User.findById(req.user_id).exec((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        
        Role.find({_id: {$in: user.roles}}, (err, roles) => {
            if (err) {
                res.status(500).send({message: err});
                return ;
            }

            for (let i=0; i<roles.length; i++) {
                if (roles[i].name === "manager") {
                    next();
                    return;
                }
            }

            res.status(403).send({message: "Require Manager Role!"});
            return;
        })
    })
}

const authJwt = {
    verifyToken,
    isAdmin,
    isManager
};

module.exports = authJwt;