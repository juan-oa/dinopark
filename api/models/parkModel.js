'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ParkSchema = new Schema({
    id: Number,
    zones: [
        { 
            type: Schema.Types.ObjectId,
            ref: 'Zones'
        }
    ]
});

module.exports = mongoose.model('Parks', ParkSchema);