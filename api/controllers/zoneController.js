'use strict';

var mongoose = require('mongoose'),
    Zone = mongoose.model('Zones');

exports.update_zone = function(req, res) {
    Zone.findOneAndUpdate({column: req.body['column'], row: req.body['row'], park_id: req.body['park_id']}, req.body, {new: true, upsert: true}, function(err, task) {
      if (err)
        res.send(err);
      res.json(task);
    });
};
