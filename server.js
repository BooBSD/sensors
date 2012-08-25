var periodic = require('./periodic')

config = require('./config');
redis = require('redis').createClient();


periodic.checkAM2302() // Run first time after starting.
var AM2302Timer = setInterval(periodic.checkAM2302, config.AM2302.timeout);

console.log('Sensors started to collect data.');
