# Node.js Study

1. Node.js기반으로 `퍼저 통합관리`를 개발하여 전반적인 library들의 사용법을 익히기 위해 공부를 진행함.

2. 현재까지 사용하려고 하는 library는 다음과 같다.

   - express

     - nodejs를 위한 간단한 웹 프레임워크

     - 빠르게 restful api 서버를 구축할 수 있음

       ```javascript
       ...
       app.get("/", (req, res) => { res.send("Hello"); });
       app.get("/signin", (req, res) => { res.render("user/signin"); });
       ...
       ```

     - middleware를 설정할 수 있어 request 처리 이전에 malformed input을 걸러낼 수 있음

       ```javascript
       app.use((req, res, next) => {
       	if(typeof(req.body.username) === "object")
       		res.status(500).send("nono...");
       	else next();
       });
       ```

   - express-session

     - 요청받은 request의 session을 추가하여 사용자의 정보를 관리할 수 있음

     - default cookie name: connect.sid

       ```javascript
       const session = require("express-session");
       app.use(session({
            secret: '__king_of_cat__',
            resave: false,
            saveUninitialized: true
       }));
       
       app.get("/", (req, res) => {
       	let sess = req.session;
           res.send(sess.username);
       });
       ```

   - body-parser

     - post 요청시 parameter를 파싱해 express만 사용시 발생하는 undefined error를 피할 수 있음

       ```javascript
       // POST / HTTP/1.1
       // ...
       // username=KuroNeko
       app.post("/", (req, res) => {
       	res.send(res.body.username);
       })
       ```

   - morgan

     - request을 logging

     - stream option을 설정해 파일로 logging가능

       ```javascript
       const morgan = require('morgan');
       const fs = require('fs');
       
       app.use(morgan("combined")); // stdout logging
       app.use(morgan("combined", { // file logging
           stream: fs.createWriteStream(log_path, { flags: 'a' })
       }));
       ```

   - ejs

     - html 코드 중복을 피하기 위한 template library

     - include로 header, footer, 기타 ejs 들을 포함가능

     - if, for 등과 같은 js syntax를 eval하여 실행

       ```javascript
       const app = express();
       app.set('view engine', 'ejs'); // render extension: .ejs
       app.set('views', 'views'); // set view path
       
       app.get('/', (req, res) => {
           // render views/test.ejs
           res.render('test', { username: "KuroNeko" });
       });
       ```

       ```ejs
       <!-- ./views/test.ejs -->
       <!DOCTYPE html>
       <html>
           <head>
               
           </head>
           <body>
               <%- include(path) %>
               <% if (user) { %>
       			<h2><%= user.name %></h2>
               <% } %>
           </body>
       </html>
       ```

   - mongoose

     - nodejs와 mongodb를 연결하기 위한 client

       ```javascript
       const mongoose = require('mongoose');
       
       mongoose.Promise = global.Promise;
       mongoose.connect("mongodb://localhost/jffuzzer", {
                       useNewUrlParser: true,
                       useUnifiedTopology: true,
                       useCreateIndex: true
               }).then(() => console.log("mongodb connected"))
               .catch(e => console.log(e));
       ```

   - multer

     - 파일 업로드를 하기 위해 사용되는 multipart request를 처리하기 위한 library

       https://github.com/expressjs/multer/blob/master/doc/README-ko.md

   - helmet

     - express 사용시 http 헤더 설정을 변경하여 환경에 대한 정보를 최소화 및 취약점 발견을 어렵게 함

       ```
       const express = require('express');
       const app = express();
       app.use(helmet());
       app.use(helmet.hidePoweredBy());
       app.use(helmet.xssFilter());
       ```

   - crypto

     - password hashing, 기타 암호화가 필요시 사용되는 library

       ```
       let pass = crypto.createHmac("sha256", secret)
       	  			 .update("nekoplus")
       	  			 .digest('hex');
       ```

   - node-docker-api

     - fuzzer가 실행될 docker를 구축 및 관리를 위해 사용되는 library

       https://www.npmjs.com/package/node-docker-api

