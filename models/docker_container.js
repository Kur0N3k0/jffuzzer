const mongoose = require('mongoose');
const defines = require('../db/defines');
const iconSchema = require('./icon');

const containerSchema = new mongoose.Schema({
    user: { type: String, required: true },
    short_id: { type: String, required: true },
    name: { type: String },
    image_id: { type: String, required: true },
    icon: { type: iconSchema }
});

module.exports = mongoose.model(defines.levelEnum.docker_image, containerSchema);