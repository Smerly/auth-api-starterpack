const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Populate = require('../autopopulate');

const statSchema = new Schema({
	statName: { type: String, required: true },
	amount: { type: Number, required: true },
});

statSchema
	.pre('findOne', Populate('artifact'))
	.pre('find', Populate('artifact'));

module.exports = model('Stat', statSchema);
