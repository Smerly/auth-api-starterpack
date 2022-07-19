const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const artifactSchema = new Schema({
	artifactSet: { type: String, required: true },
	mainStat: { type: Schema.Types.ObjectId, ref: 'Stat', required: true },
	subStat1: { type: Schema.Types.ObjectId, ref: 'Stat', required: true },
	subStat2: { type: Schema.Types.ObjectId, ref: 'Stat', required: true },
	subStat3: { type: Schema.Types.ObjectId, ref: 'Stat', required: true },
	subStat4: { type: Schema.Types.ObjectId, ref: 'Stat', required: true },
});

module.exports = model('Artifact', artifactSchema);
