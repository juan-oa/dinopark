'use strict';

var dinos = require('../controllers/dinoController');
var zones = require('../controllers/zoneController');

var mongoose = require('mongoose'),
    Dino = mongoose.model('Dinos'),
    Park = mongoose.model('Parks'),
    Zone = mongoose.model('Zones');

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
            dino_location_updated(req.body, res)
            break;
        case "dino_fed":
            var data = {
                'id': req.body['dinosaur_id'],
                'last_fed': req.body['time']
            }
            dinos.update_dino(data, res)
            break;
        case "maintenance_performed":
            req.body['column'] = req.body['location'].charAt(0)
            req.body['row'] = req.body['location'].slice(1)
            req.body['last_maintenance'] = req.body['time'] 
            zones.update_zone(req, res)
            break;
        default:
            res.send('Invalid kind');
    }
};

exports.maintenance = function(req, res) {
    var request_date = Date.now;
    if ('time' in req.body)
        request_date = req.body['time']
    Zone.find({})
        .populate('dinos')
        .sort({ column: 1, row: 1 })
        .exec(function (err, zones) {
            if (err) console.log(err);
            var result = []
            zones.forEach(function(zone) {
                var el = {
                    'location': zone.column + zone.row,
                    'park_id': zone.park_id,
                    'maintenance': false,
                    'safe': true,
                }
                var one_day=1000*60*60*24;
                if (zone.last_maintenance) {
                    var date_diff = (request_date - zone.last_maintenance)/one_day;
                    el['maintenance'] = (date_diff >= 30);
                } else {
                    el['maintenance'] = true;
                }
                zone.dinos.forEach(function(dino) {
                    if (request_date > (dino.last_fed + dino.digestion_period_in_hours)) {
                        el['safe'] = false;
                        return;
                    }
                });
                result.push(el);
            });
            res.send(result);
        });
};

function dino_location_updated(data, res) {
    var zone_data = {
        'column': data['location'].charAt(0),
        'row': data['location'].slice(1),
        'park_id': data['park_id']
    }
    var column = data['location'].charAt(0);
    var row = data['location'].slice(1);
    Zone.findOneAndUpdate({park_id: data['park_id'], column: column, row: row}, zone_data, {new: true, upsert: true}, function(err, zone) {
        if (err)
            res.send(err);
        dinos.update_dino({ zone_id: zone._id, id: data['dinosaur_id'] }, res);
    });
}