const express = require('express');
const Docker = require('dockerode');
const db = require('../db/connection');
const Image = require('../models/docker_image');
const Container = require('../models/docker_container');
const { fuzzerEnum } = require('../db/defines');
const fs = require('fs');

var router = express.Router();
const docker = new Docker({socketPath: '/var/run/docker.sock'});

router.get("/", function(req, res) {
    res.send("docker nah..");
});

router.post("/image/create", function(req, res) {
    let type = req.body.type;
    let name = req.body.name;

    if(fuzzerEnum.indexOf(type) == -1){
        res.render("aaa");
        return;
    }

    if(name === undefined || name.length === 0) {
        res.render("aaa");
        return;
    }

    Image.findOne({name: name}, function(err, result) {
        if(result !== null) {
            res.send("no!");
            return;
        }

        // start Image build
        let stream = docker.buildImage({
            context: `${__dirname}/../dockerfile/${type}`,
            src: [`Dockerfile`]
        }, { t: name }).then((stream) => {
            let image = new Image({
                name: name,
                fuzzer_type: type,
                icon: {
                    path: "",
                    is_default: true
                }
            });
            image.save().then((value) => {
                Image.findOne({ name: name }, function(err, result) {
                    let path = __dirname + "/../dockerfile/" + type + "/" + result._id;
                    fs.exists(path, function(exist) {
                        if(!exist)
                            fs.mkdir(path);
                    });
                });
                res.send("nah...");
            }, (rej) => {
                res.send("no!!");
            });
        }, (reason) => {
            res.send("no!!!");
        });
    });
});

router.get("/images", function(req, res) {
    let image = docker.getImage("test");
    image.inspect(function(err, result) {
        console.log(result);
    });
    res.send("nah..");
});

/*
docker shared_vol
./[fuzzer_type]/[hostname]/bin      /root/bin
./[fuzzer_type]/[hostname]/run.sh   /root/run.sh
*/
router.get("/image/run/:image_tag", function(req, res) {
    let image_tag = req.params.image_tag;
    Image.findOne({name: image_tag}, function(err, result) {
        let volume = { };
        volume[__dirname + "/../dockerfile/" + result.fuzzer_type + "/" + result._id] = "/root";
        docker.run(image_tag, [], process.stdout, {
            Volumes: {volume}
        }, { }, function(err, result) {
            console.log(err, result);
            res.send("nah..");
        });
    });
})

module.exports = router;