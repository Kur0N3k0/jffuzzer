const express = require('express');
const multer = require('multer');
const db = require('../db/connection');

var router = express.Router();

router.get("/", function(req, res) {
    res.send("docker nah..");
});

router.get("/upload", function(req, res){


});

module.exports = router;