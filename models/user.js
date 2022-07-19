// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const Schema = mongoose.Schema;

// const UserSchema = new Schema(
// 	{
// 		createdAt: { type: Date },
// 		updatedAt: { type: Date },
// 		password: { type: String, select: false },
// 		username: { type: String, required: true },
// 		builds: [{ type: Schema.Types.ObjectId, ref: 'Build' }],
// 		artifacts: [{ type: Schema.Types.ObjectId, ref: 'Artifact' }],
// 	},
// 	{ timestamps: { createdAt: 'created_at' } }
// );

// // Must use function here! ES6 => functions do not bind this!
// UserSchema.pre('save', function (next) {
// 	// ENCRYPT PASSWORD
// 	const user = this;
// 	if (!user.isModified('password')) {
// 		return next();
// 	}
// 	bcrypt.genSalt(10, (err, salt) => {
// 		bcrypt.hash(user.password, salt, (err, hash) => {
// 			user.password = hash;
// 			next();
// 		});
// 	});
// });

// // Need to use function to enable this.password to work.
// UserSchema.methods.comparePassword = function (password, done) {
// 	bcrypt.compare(password, this.password, (err, isMatch) => {
// 		done(err, isMatch);
// 	});
// };

// module.exports = mongoose.model('User', UserSchema);

const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const userSchema = new Schema(
	{
		username: { type: String, required: true },
		password: { type: String, select: false },
		builds: [{ type: Schema.Types.ObjectId, ref: 'Build' }],
		artifacts: [{ type: Schema.Types.ObjectId, ref: 'Artifact' }],
	},
	{ timestamps: true }
);

// Must use function expressions here! ES6 => functions do not bind this!
userSchema.pre('save', function (next) {
	// ENCRYPT PASSWORD
	const user = this;
	if (!user.isModified('password')) {
		return next();
	}
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(user.password, salt, (_, hash) => {
			user.password = hash;
			next();
		});
	});
});

// Need to use function to enable this.password to work.
userSchema.methods.comparePassword = function (password, done) {
	bcrypt.compare(password, this.password, (err, isMatch) => {
		done(err, isMatch);
	});
};

module.exports = model('User', userSchema);
