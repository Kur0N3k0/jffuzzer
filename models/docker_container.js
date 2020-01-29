const mongoose = require('mongoose');
const defines = require('../db/defines');
const iconSchema = require('./icon');

const containerSchema = new mongoose.Schema({
    short_id: { type: String, required: true },
    name: { type: String },
    image_id: { type: String, required: true },
    fuzzer_type: { type: String, enum: defines.fuzzerEnum, default: defines.fuzzerEnum[0], required: true },
    icon: { type: iconSchema }
});

module.exports = mongoose.model(defines.docker_container, containerSchema);