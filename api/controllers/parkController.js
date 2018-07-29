'use strict';

var dinos = require('../controllers/dinoController');
var mongoose = require('mongoose'),
    Dino = mongoose.model('Dinos');

exports.nulds_event = function(req, res) {
    var kind = req.body['kind'];
    switch(kind) {
        case "dino_added":
            dinos.create_dino(req, res);
            break;
        case "dino_removed":
            dinos.delete_dino(req, res);
            break;
        case "dino_location_updated":
            break;
        case "dino_fed":
            var data = {
                'id': req.body['id'],
                'last_fed': req.body['time']
            }
            dinos.update_dino(data, res)
            break;
    }
};