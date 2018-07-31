const request = require('request');
var express = require('express'),
	app = express(),
	port = process.env.PORT || 3000,
	mongoose = require('mongoose'),
	Dino = require('./api/models/dinoModel'),
	Zone = require('./api/models/zoneModel'),
	bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/dinoPark');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var routesDino = require('./api/routes/dinoRoutes');
routesDino(app);
var routesPark = require('./api/routes/parkRoutes');
routesPark(app);

app.use(function(req, res) {
	res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

for (var letter = 65; letter < 90; letter++) {
	var tmp_letter = String.fromCharCode(letter);
	for (var number = 1; number <= 15; number++) {
		Zone.findOneAndUpdate({ column: tmp_letter, row: number }, {$set: {column: tmp_letter, row: number, park_id: 1} }, {new: true, upsert: true}, function (err, doc) {
			if (err) {
				console.log(err);
			}
		});
	}
}

request('https://dinoparks.net/nudls/feed', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  body.forEach(element => {
	  request.post('http://localhost:'+ port + '/api/v1/event', {json: element}, function (error, response, body) {
		  if (error) console.log(error);
	  })
  });
});


console.log('API server started on: ' + port);