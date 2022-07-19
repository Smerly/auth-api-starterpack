const Artifact = require('../models/artifact');
const User = require('../models/user');

module.exports = (app) => {
	app.get('/', (req, res) => {
		const currentUser = req.user;
		Artifact.find({}).lean().populate('creator');
	});
};
