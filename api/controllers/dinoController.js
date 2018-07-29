'use strict';

var mongoose = require('mongoose'),
    Dino = mongoose.model('Dinos');

exports.list_all_dinos = function(req, res) {
    Dino.find({}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.create_dino = function(req, res) {
    var data = {
        'id': req.body['id'],
        'name': req.body['name'],
        'species': req.body['species'],
        'gender': req.body['gender'],
        'digestion_period_in_hours': req.body['digestion_period_in_hours'],
        'herbivore': req.body['herbivore'],
        'last_fed': req.body['time'],
    }
    var new_dino = new Dino(data);
    new_dino.save(function(err, dino) {
      if (err)
        res.send(err);
      res.json(dino);
    });
};

exports.update_dino = function(req, res) {
    Dino.findOneAndUpdate({id: req['id']}, req, {new: true}, function(err, task) {
      if (err)
        res.send(err);
      res.json(task);
    });
};

exports.delete_dino = function(req, res) {
    Dino.remove({
        id: req.body['id']
    }, function(err, dino) {
        if (err)
            res.send(err);
        res.json({ message: 'Dino successfully removed'});
    });
};
