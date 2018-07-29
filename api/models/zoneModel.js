'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ZoneSchema = Schema({
    last_maintenance: Date,
});

module.exports = mongoose.model('Zones', ZoneSchema);