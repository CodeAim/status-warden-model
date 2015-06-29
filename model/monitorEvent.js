var mongoose = require('mongoose');
var idValidator = require('mongoose-id-validator');

var monitorEventSchema = new mongoose.Schema({
    confirmed: { type: Boolean, required: true, default: false },
	created: { type: Date, default: Date.now, required: true },
	monitor: { type: mongoose.Schema.Types.ObjectId, ref: 'Monitor', required: true },
	responseTime: { type: Number, required: true },
    status: { type: String, enum: ['Up', 'Down'], required: true },
	statusCode: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
},
{
	collection: 'monitorEvent'
});

monitorEventSchema.plugin(idValidator);

module.exports = monitorEventSchema;
