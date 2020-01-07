const express = require('express');
const crypto = require('crypto');
const User = require('../models/user');
const { secret } = require('../config');
const { levelEnum } = require('../db/defines');
const { sanityBody } = require("../middleware");

const router = express.Router();
router.use(sanityBody);

router.get("/", function(req, res) {
    res.send("user nah..");
});

router.get("/info/:username", function(req, res) {
    const username = req.params.username;
    User.find({ username: username }, (err, result) => {
        res.render("user/info", { info: result[0] });
    });
});

router.get("/test", function(req, res) { 
    res.render("aaa", { username: "KuroNeko" });
});

router.post("/test", function(req, res) {
    res.render("aaa", { username: req.body.username });
});

module.exports = router;