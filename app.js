const express = require('express');
const session = require('express-session');
const bodyParser= require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const { session_secret, log_path } = require('./config');
const { initialize } = require('./init');
var DockerRouter = require("./routers/docker");
var UserRouter = require("./routers/user");
var MonitorRouter = require("./routers/monitor");

initialize();

const app = express();
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(helmet.xssFilter());
app.use(morgan("combined"));
app.use(morgan("combined", {
    stream: fs.createWriteStream(log_path, { flags: 'a' })
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: session_secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        path: '/',
        expires: new Date(Date.now() + 3 * 60 * 60 * 1000) // 3 hour
    }
}));

app.get('/', (req, res) => {
    res.render('layout', { path: 'main' });
});

app.use("/docker", DockerRouter);
app.use("/user", UserRouter);
app.use("/monitor", MonitorRouter);

app.listen(3000);