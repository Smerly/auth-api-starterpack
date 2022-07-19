const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const Populate = require('../autopopulate');

const artifactSchema = new Schema({
	artifactSet: { type: String, required: true },
	mainStat: { type: Schema.Types.ObjectId, ref: 'Stat', required: true },
	subStat1: { type: Schema.Types.ObjectId, ref: 'Stat', required: true },
	subStat2: { type: Schema.Types.ObjectId, ref: 'Stat', required: true },
	subStat3: { type: Schema.Types.ObjectId, ref: 'Stat', required: true },
	subStat4: { type: Schema.Types.ObjectId, ref: 'Stat', required: true },
	owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

artifactSchema
	.pre('findOne', Populate('owner'))
	.pre('find', Populate('owner'))
	.pre('findOne', Populate('build'))
	.pre('find', Populate('build'));

module.exports = model('Artifact', artifactSchema);
