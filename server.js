var express = require('express'),
	app = express(),
	port = process.env.PORT || 3000,
	mongoose = require('mongoose'),
	Task = require('./api/models/todoListModel'),
	Dino = require('./api/models/dinoModel'),
	bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var routesTodo = require('./api/routes/todoListRoutes');
routesTodo(app);
var routesDino = require('./api/routes/dinoRoutes');
routesDino(app);
var routesPark = require('./api/routes/parkRoutes');
routesPark(app);

app.use(function(req, res) {
	res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('RESTful API server started on: ' + port);