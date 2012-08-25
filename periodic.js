var exec = require('child_process').exec

Date.prototype.timestamp = function() {
	return Math.floor(this.getTime() / 1000)
}


exports.checkAM2302 = function() {
	var getData = function() {
		exec(config.AM2302.command, function(error, stdout, stderror) {
			if(stdout) {
				var result = stdout.match(/Temp =\s+([0-9.]+).+Hum =\s+([0-9.]+)/im);
				if(result) {
					var ts = new Date().timestamp();
					var data = ts + ';' + result[1] + ';' + result[2];
					redis.zadd('sensors:AM2302', ts, data, function(error) {
						if(!error) clearInterval(getDataTimer);
					});
				}
			}
		});
	}
	exec(config.AM2302.command); // Dirty hack for getting actual data
	var getDataTimer = setInterval(getData, config.AM2302.errorTimeout);
}