var mongoose = require('mongoose');

module.exports.Job = mongoose.model('Job', require('./model/job.js'));
module.exports.Monitor = mongoose.model('Monitor', require('./model/monitor.js'));
module.exports.MonitorEvent = mongoose.model('MonitorEvent', require('./model/monitorEvent.js'));
module.exports.User = mongoose.model('User', require('./model/user.js'));