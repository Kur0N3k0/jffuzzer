const sanityBase = (req, res, next, callback = undefined) => {
    var check = [ req.body, req.query, req.params ];
    for(i = 0; i < check.length; i++) {
        console.log(check[i]);
        if(check[i].length != 0) {
            for(const [key, value] of Object.entries(check[i])) {
                if(typeof(value) === "object") {
                    res.status(500).send("invalid input");
                    return;
                }
                if(callback !== undefined) {
                    console.log(key, value);
                    check[i][key] = callback(value);
                    console.log(key, value);
                }
            }
        }
    }
    next();
}

module.exports = {
    sanityBody: (req, res, next) => {
        sanityBase(req, res, next);
    },
    sanityXss: (req, res, next) => {
        sanityBase(req, res, next, (data) => {
            data = data.replace(/\"/g, "&quot;");
            data = data.replace(/\'/g, "&apos;");
            data = data.replace(/\</g, "&lt;");
            data = data.replace(/\>/g, "&gt;");
            return data.replace(/\`/g, "&#96;");
        });
    }
}