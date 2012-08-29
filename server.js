var util = require('util'),
	Reminder = require('reminder'),
	remind = new Reminder(),
	periodic = require('./periodic')

config = require('./config');
redis = require('redis').createClient();

redis.on('error', function(error) {
	util.log(error);
});

redis.on('ready', function() {
	remind.every(config.AM2302.timeout, periodic.checkAM2302)
	util.log('Sensors started to collect data.');
});
