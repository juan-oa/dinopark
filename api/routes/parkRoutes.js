'use strict';

module.exports = function(app) {
    var park = require('../controllers/parkController');

    app.route('/api/v1/event')
        .post(park.nulds_event);
}