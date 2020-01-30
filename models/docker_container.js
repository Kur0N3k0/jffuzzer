const mongoose = require('mongoose');
const defines = require('../db/defines');
const iconSchema = require('./icon');

const containerSchema = new mongoose.Schema({
    short_id: { type: String, required: true },
    image_name: { type: String, required: true },
});

module.exports = mongoose.model(defines.docker_container, containerSchema);