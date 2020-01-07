const express = require('express');
const session = require('express-session');
const bodyParser= require('body-parser');
const { session_secret } = require('./config');
var DockerRouter = require("./routers/docker");
var UserRouter = require("./routers/user");
var MonitorRouter = require("./routers/monitor");
const { initialize } = require('./init');

initialize();

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: session_secret,
    resave: false,
    saveUninitlaized: true
}));

app.get('/', (req, res)=>{
    res.render('aaa', { username: "KuroNeko" });
});

app.use("/docker", DockerRouter);
app.use("/user", UserRouter);
app.use("/monitor", MonitorRouter);

app.listen(3000);