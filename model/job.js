var mongoose = require('mongoose');
var idValidator = require('mongoose-id-validator');

var jobSchema = new mongoose.Schema({
	created: { type: Date, default: Date.now, required: true },
	monitor: { type: mongoose.Schema.Types.ObjectId, ref: 'Monitor' },
	name: { type: String, enum: ['urlStatusCheck'], required: true },
	nextRunAt: { type: Date, default: Date.now },
	priority: { type: Number, default: 0, required: true },
	repeatInterval: { type: String, default: "1 minute", required: true },
	type: { type: String, enum: ['normal'], default: 'normal', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
},
{
	collection: 'job'
});

jobSchema.plugin(idValidator);

module.exports = jobSchema;
