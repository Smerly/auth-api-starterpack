const Build = require('../models/build');
const User = require('../models/user');

module.exports = (app) => {
	app.get('/', (req, res) => {
		const currentUser = req.user;
		Build.find({})
			.lean()
			.populate('owner')
			.then((builds) => res.render('builds-index', { builds, currentUser }))
			.catch((err) => {
				console.log(err.message);
			});
	});
	app.get('/builds/new', (req, res) => {
		var currentUser = req.user;
		res.render('builds-new', { currentUser });
	});

	app.post('/builds/new', (req, res) => {
		if (req.user) {
			const newBuild = new Build('req.body');
			const userId = req.user_id;
			newBuild.flower = {};
			newBuild.feather = {};
			newBuild.sands = {};
			newBuild.goblet = {};
			newBuild.circlet = {};
			newBuild
				.save()
				.then(() => User.findById(userId))
				.then((user) => {
					user.builds.unshift(newBuild);
					user.save();
					return res.redirect(`/builds/${newBuild._id}`);
				})
				.catch((err) => {
					console.log(err.message);
				});
		} else {
			return res.status(401);
		}
	});

	app.get('builds/:id', (req, res) => {
		const currentUser = req.user;
		// confuse: .populate() line
		Build.findById(req.params.id)
			.populate('artifacts')
			.lean()
			.then((builds) => res.render('builds-show', { builds, currentUser }))
			.catch((err) => {
				console.log(err);
			});
	});

	// Outside layer here
};
