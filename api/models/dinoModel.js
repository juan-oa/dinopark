'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DinoSchema = new Schema({
    id: Number,
    name: String,
    species: String,
    gender: {
        type: [{
            type: String,
            enum: ['male', 'female']
        }]
    },
    digestion_period_in_hours: Number,
    herbivore: false,
    last_fed: Date,
    zone_id: {
        type: Schema.Types.ObjectId,
        ref: 'Zones'
    }
});

DinoSchema
.virtual('url')
.get(function () {
    return '/dinopark/dino/' + this.id;
});

module.exports = mongoose.model('Dinos', DinoSchema);