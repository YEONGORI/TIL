const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        user_id: String,
        user_pw: String,
        user_name: String,
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ]
    })
);

module.exports = User;