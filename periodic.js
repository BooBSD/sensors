var exec = require('child_process').exec,
	util = require('util')


Date.prototype.timestamp = function() {
	return Math.floor(this.getTime() / 1000)
}

exports.checkAM2302 = function(date) {
	var getData = function() {
		exec(config.AM2302.command, function(error, stdout, stderror) {
			if(error) console.log(error)
			else if(stderror) console.log(stderror)
			else {
				var result = stdout.match(/Temp =\s+([0-9.]+).+Hum =\s+([0-9.]+)/im);
				if(result) {
					var ts = date.timestamp()
					var data = ts + ',' + result[1] + ',' + result[2];
					redis.zadd('sensors:AM2302', ts, data, function(error) {
						if(!error) {
							clearInterval(getDataTimer);
							util.log('Saving new data from sensor AM2302.');
						}
					});
				}
			}
		});
	}
	exec(config.AM2302.command); // Dirty hack for getting actual data
	var getDataTimer = setInterval(getData, config.AM2302.errorTimeout);
}
