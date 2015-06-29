var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var job = mongoose.model('Job', require('./job.js'));
var monitor = mongoose.model('Monitor', require('./monitor.js'));
var monitorEvent = mongoose.model('MonitorEvent', require('./monitorEvent.js'));

var userSchema = new mongoose.Schema({
    admin: { type: Boolean, required: true, default: false },
	created: { type: Date, default: Date.now, required: true },
    displayName: { type: String, unique: true, required: true },
	emailAddress: { type: String, unique: true, validate: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i, required: true },
	password: { type: String, required: true, select: false },
    verified: { type: Boolean, required: true, default: false }
},
{
	collection: 'user'
});

userSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            next();
        });
    });
});

userSchema.pre('remove', function(next) {
    var user = this;
    job.remove({ user: user._id }).exec();
    monitor.remove({ user: user._id }).exec();
    monitorEvent.remove({ user: user._id }).exec();
    next();
});

userSchema.methods.comparePassword = function(password, done) {
    var user = this;
    bcrypt.compare(password, user.password, function(err, isMatch) {
        done(err, isMatch);
    });
};

module.exports = userSchema;
