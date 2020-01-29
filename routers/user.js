const express = require('express');
const crypto = require('crypto');
const User = require('../models/user');
const { secret } = require('../config');
const { levelEnum } = require('../db/defines');
const { sanityBody, sanityXss } = require("../middleware");

const router = express.Router();
router.use(sanityBody);
router.use(sanityXss);

router.get("/", function(req, res) {
    res.send("user nah..");
});

router.get("/info/:username", sanityXss, function(req, res) {
    const username = req.params.username;
    console.log(username);
    User.find({ username: username }, (err, result) => {
        if(result.length == 1)
            res.render("user/info", { info: result[0] });
        else
            res.render("user/info", { info: "nah..." });
    });
});

router.get("/signin", function(req, res) { 
    res.render("user/signin");
});

router.post("/signin", function(req, res) {
    sess = request.session
    if(auth) {
        res.redirect("/");
        return;
    }

    User.find({ username: username }, (err, result) => {
        if(result.length == 1) {
            res.redirect("/");
        }
        else
            res.render("user/info", { info: "nah..." });
    });
});

router.get("/signup", function(req, res) {
    res.render("aaa", { username: "hah" });
});

router.post("/signup", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    User.find({ username: username }, (err, result) => {
        if(result.length == 1) res.send("exists");
        else {
            var user = new User({
                username: username,
                password: crypto.createHmac("sha256", secret)
                                .update(password)
                                .digest('hex'),
                reg_date: new Date(),
                level: levelEnum.user
            });
            user.save();
            res.send("ok");
        }
    });
});

router.get("/test", function(req, res) {
    res.render("layout", { path: req.query.path });
});

router.post("/test", function(req, res) {
    res.render("aaa", { username: req.body.username });
});

module.exports = router;