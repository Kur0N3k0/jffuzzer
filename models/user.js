const mongoose = require('mongoose');
const defines = require('../db/defines');
const iconSchema = require('./icon');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    icon: iconSchema,
    description: { type: String },
    reg_date: { type: Date, required: true },
    level: { type: Number, required: true, default: defines.levelEnum.user }
});

module.exports = mongoose.model(defines.user, userSchema);