const config = require("../config/auth_config");
const db = require("../models/index");
const User = db.user;
const Role = db.role;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { user } = require("../models/index");

exports.signup = (req, res) => {
    const user = new User({
        user_id: req.body.user_id,
        user_pw: bcrypt.hashSync(req.body.pass_wd, 8),
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
    .exec((err, user))
}