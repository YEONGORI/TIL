const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const DB = {};

DB.mongoose = mongoose;

DB.user = require("./user_model");
DB.role = require("./role_model");

DB.ROLES = ["admin", "manager", "employee"];

module.exports = DB;