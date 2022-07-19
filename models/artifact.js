const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const Populate = require('../autopopulate');

const artifactSchema = new Schema(
	{
		artifactSet: { type: String, required: true },
		owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		// partOfBuild: { type: Schema.Types.ObjectId, ref: 'Build', required: true },
	},

	{ strictPopulate: false }
);

artifactSchema
	.pre('findOne', Populate('owner'))
	.pre('find', Populate('owner'))
	.pre('findOne', Populate('build'))
	.pre('find', Populate('build'));

module.exports = model('Artifact', artifactSchema);
