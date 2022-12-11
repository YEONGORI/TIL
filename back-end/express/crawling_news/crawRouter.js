const express = require("express");

let router = express.Router();
let crawController = require("./crawController");

router.get("/", crawController.crawData);

module.exports = router;
