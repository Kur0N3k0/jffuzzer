module.exports = {
    sanityBody: (req, res, next) => {
        if(req.body.length != 0) {
            for(const [key, value] of Object.entries(req.body)) {
                if(typeof(value) === "object") {
                    res.status(500).send("invalid input");
                    return;
                }
            }
            next();
        }
    },
    sanityXss: require('xss-escape')
}