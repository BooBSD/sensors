var Reminder = require('reminder'),
	remind = new Reminder(),
	periodic = require('./periodic')

config = require('./config');
redis = require('redis').createClient();

redis.on('error', function(error) {
	console.log(error);
});

redis.on('ready', function() {
	remind.every(config.AM2302.timeout, periodic.checkAM2302)
	console.log('Sensors started to collect data.');
});
