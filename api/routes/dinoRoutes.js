'use strict';

module.exports = function(app) {
    var dinos = require('../controllers/dinoController');

    app.route('/dinos')
        .post(dinos.create_dino);
}