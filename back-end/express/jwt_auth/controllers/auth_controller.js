const config = require("../config/auth_config");
const db = require("../models/index");
const User = db.user;
const Role = db.role;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    const user = new User({
        user_id: req.body.user_id,
        user_pw: bcrypt.hashSync(req.body.user_pw, 8),
        user_name: req.body.user_name
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        if (req.body.roles) {
            Role.find({name: {$in: req.body.roles}}, (err, roles) => {
                if (err) {
                    res.status(500).send({message: err});
                    return;
                }

                user.roles = roles.map(role => role._id);
                user.save(err => {
                    if (err) {
                        res.status(500).send({message: err});
                        return;
                    }
                    res.send({message: "회원가입 성공"});
                });
            })
        }
        else {
            Role.findOne({name: "user"}, (err, role) => {
                if (err) {
                    res.status(500).send({message: err});
                    return;
                }

                user.roles = [role._id];
                user.save((err) => {
                    if (err) {
                        res.status(500).send({message: err});
                        return;
                    }
                    res.send({message: "회원가입 성공"})
                })
            })
        }
    })
};

exports.signin = (req, res) => {
    User.findOne({
        user_name: req.body.user_name
    })
    .populate("roles", "-__v")
    .exec((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }

        if (!user) {
            return res.send(404).send({message: "User를 찾을 수 없습니다."});
        }

        const passwordIsValid = bcrypt.compareSync(
            user.user_id,
            req.body.user_pw,
        )

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "유효하지 않은 비밀번호 입니다."
            })
        }

        const token = jwt.sign({id: user.user_id}, config.secret, {
            expiresIn: 86400
        })
        let authorities = [];

        for (let i=0; i<user.roles.length; i++){
            authorities.push("ROLE_" + user.roles[i].toUpperCase());
        }

        res.status(200).send({
            user_id: user.user_id,
            user_name: user.user_name,
            roles: authorities,
            accessToken: token            
        })
    })
}