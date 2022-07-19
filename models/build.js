const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const Populate = require('../autopopulate');

const buildSchema = new Schema({
	name: { type: String, required: true },
	flower: { type: Schema.Types.ObjectId, ref: 'Artifact' },
	feather: { type: Schema.Types.ObjectId, ref: 'Artifact' },
	sands: { type: Schema.Types.ObjectId, ref: 'Artifact' },
	goblet: { type: Schema.Types.ObjectId, ref: 'Artifact' },
	circlet: { type: Schema.Types.ObjectId, ref: 'Artifact' },
	owner: { type: Schema.Types.ObjectId, ref: 'User' },
});

buildSchema.pre('findOne', Populate('owner')).pre('find', Populate('owner'));

module.exports = model('Build', buildSchema);
