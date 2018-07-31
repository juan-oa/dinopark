'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ZoneSchema = Schema({
    last_maintenance: Date,
    column: {
        type: String,
        validate: function(column) {
            return ([A-Z])
        }
    },
    row: {
        type: Number,
        validate: function(row) {
            return (1[0-5]|[1-9])
        }
    },
    park_id: Number,
});

ZoneSchema.virtual('dinos', {
    ref: 'Dinos',
    localField: '_id',
    foreignField: 'zone_id'
  });

module.exports = mongoose.model('Zones', ZoneSchema);