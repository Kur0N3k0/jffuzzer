const express = require('express');
const crypto = require('crypto');
const User = require('../models/user');
const { secret, debug } = require('../config');
const { levelEnum } = require('../db/defines');
const { sanityBody, sanityXss, is_signin } = require("../middleware");

const router = express.Router();
router.use(sanityBody);
router.use(sanityXss);

router.get("/", function(req, res) {
    res.redirect("/user/signin");
});

router.get("/signin", function(req, res) { 
    res.render("layout", { path: "user/signin" });
});

router.post("/signin", function(req, res) {
    User.find({ username: username })
    .then((result) => {
        if(result.length !== 1) res.redirect("/");
        else {
            req.session.auth = true;
            req.session.username = username;
            res.send("ok");
        }
    }, (rej) => { });
});

if(debug) {
    router.get("/info/:username", is_signin, sanityXss, function(req, res) {
        const username = req.params.username;
        User.find({ username: username }, (err, result) => {
            if(result.length == 1)
                res.render("layout", { path: "user/info", info: result[0] });
            else
                res.render("layout", { });
        });
    });

    router.get("/signup", function(req, res) {
        res.render("layout", { path: "user/signup" });
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
}

module.exports = router;