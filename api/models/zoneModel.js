'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ZoneSchema = Schema({
    last_maintenance: Date,
    column: String,
    row: Number,
    park_id: Number
});

module.exports = mongoose.model('Zones', ZoneSchema);