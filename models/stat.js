const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const statSchema = new Schema({
	statName: { type: String, required: true },
	amount: { type: Number, required: true },
});

module.exports = model('Stat', statSchema);
