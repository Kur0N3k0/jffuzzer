const { secret } = require('./config');
const User = require('./models/user');

module.exports = {
    initialize: () => {
        // create admin user
        User.find({ username: "KuroNeko" }, (err, res) => {
            if (res.length == 0) {
                let admin = new User({
                    username: "KuroNeko",
                    password: crypto.createHmac("sha256", secret)
                                    .update("nekoplus")
                                    .digest('hex'),
                    reg_date: new Date(),
                    level: levelEnum.admin
                });
                admin.save();
            }
        });
    }
}