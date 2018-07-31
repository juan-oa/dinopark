'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ZoneSchema = Schema({
    last_maintenance: Date,
    column: String,
    row: Number,
    park_id: Number,
});

ZoneSchema.virtual('dinos', {
    ref: 'Dinos',
    localField: '_id',
    foreignField: 'zone_id'
  });

module.exports = mongoose.model('Zones', ZoneSchema);