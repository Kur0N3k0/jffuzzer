const mongoose = require('mongoose');

const iconSchema = new mongoose.Schema({
    path: { type: String, default: "" },
    is_default: { type: Boolean, default: true }
});

module.exports = iconSchema;