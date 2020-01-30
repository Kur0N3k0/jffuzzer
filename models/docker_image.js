const mongoose = require('mongoose');
const defines = require('../db/defines');
const iconSchema = require('./icon');

const imageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    fuzzer_type: { type: String, enum: defines.fuzzerEnum, default: defines.fuzzerEnum[0], required: true },
});

module.exports = mongoose.model(defines.docker_image, imageSchema);