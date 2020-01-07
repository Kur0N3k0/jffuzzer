const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/jffuzzer", {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
        }).then(() => console.log("mongodb connected"))
        .catch(e => console.log(e));

module.exports = mongoose.connection;