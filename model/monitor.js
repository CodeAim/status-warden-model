var mongoose = require('mongoose');
var idValidator = require('mongoose-id-validator');

var job = mongoose.model('Job', require('./job.js'));
var monitorEvent = mongoose.model('MonitorEvent', require('./monitorEvent.js'));

var monitorSchema = new mongoose.Schema({
	created: { type: Date, default: Date.now, required: true },
	job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
	name: { type: String, required: true },
	repeatInterval: { type: String, default: "1 minute" },
	state: { type: String, enum: ['Running', 'Stopped'], default: 'Running', required: true },
	status: { type: String, enum: ['Down', 'Invalid', 'Unknown', 'Up'], default: 'Unknown', required: true },
	url: { type: String, validate: /((?:https?\:\/\/)(?:[-a-z0-9]+\.)*[-a-z0-9]+.*)/i, required: true },
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
},
{
	collection: 'monitor'
});

monitorSchema.plugin(idValidator);

monitorSchema.pre('remove', function(next) {
    var monitor = this;
	job.remove({ monitor: monitor._id }).exec();
    monitorEvent.remove({ monitor: monitor._id }).exec();
    next();
});

module.exports = monitorSchema;
