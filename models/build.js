const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const buildSchema = new Schema({
	flower: { type: Schema.Types.ObjectId, ref: 'Artifact' },
	feather: { type: Schema.Types.ObjectId, ref: 'Artifact' },
	sands: { type: Schema.Types.ObjectId, ref: 'Artifact' },
	goblet: { type: Schema.Types.ObjectId, ref: 'Artifact' },
	circlet: { type: Schema.Types.ObjectId, ref: 'Artifact' },
});

module.exports = model('Build', buildSchema);
