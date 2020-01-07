const mongoose = require('mongoose');
const defines = require('../db/defines');
const iconSchema = require('./icon');

const imageSchema = new mongoose.Schema({
    user: { type: String, required: true },
    short_id: { type: String, required: true },
    name: { type: String },
    icon: { type: iconSchema }
});

module.exports = mongoose.model(defines.levelEnum.docker_image, imageSchema);