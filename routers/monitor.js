var express = require("express");
const db = require('../db/connection');

var router = express.Router();

router.get("/", function(req, res) {
    res.send("monitor nah..");
});

module.exports = router;