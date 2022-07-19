const Artifact = require('../models/artifact');
const User = require('../models/user');

module.exports = (app) => {
	app.get('/allArtifacts', (req, res) => {
		const currentUser = req.user;
		Artifact.find({})
			.lean()
			.populate('owner')
			.populate('build')
			.then((artifacts) =>
				res.render('artifacts-index', { artifacts, currentUser })
			)
			.catch((err) => {
				console.log(err.message);
			});
	});
	// app.get('/', (req, res) => {
	// 	const currentUser = req.user;
	// 	Artifact.find({})
	// 		.lean()
	// 		.populate('owner')
	// 		.populate('build')
	// 		.then((artifacts) =>
	// 			res.render('artifacts-index', { artifacts, currentUser })
	// 		)
	// 		.catch((err) => {
	// 			console.log(err.message);
	// 		});
	// });

	app.get('/artifacts/new', (req, res) => {
		var currentUser = req.user;
		res.render('artifacts-new', { currentUser });
	});

	app.post('/artifacts/new', (req, res) => {
		if (req.user) {
			const newArtifact = new Artifact(req.body);
			const userId = req.user._id;
			newArtifact.owner = userId;
			newArtifact
				.save()
				.then(() => User.findById(userId))
				.then((user) => {
					user.artifacts.unshift(newArtifact);
					user.save();
					return res.redirect(`/artifacts/${newArtifact._id}`);
				})
				.catch((err) => {
					console.log(err.message);
				});
		} else {
			return res.status(401);
		}
	});
	app.get('/artifacts/:id', (req, res) => {
		const currentUser = req.user;
		Artifact.findById(req.params.id)
			.lean()
			.then((artifact) =>
				res.render('artifacts-show', { artifact, currentUser })
			)
			.catch((err) => {
				console.log(err.message);
			});
	});

	app.post('/builds/:buildsId/artifacts', (req, res) => {
		const newArtifact = new Artifact(req.body);
		newArtifact.owner = req.user._id;
		newArtifact
			.save()
			.then(() => Promise.all([Build.findById(req.params.buildId)]))
			.then(([build]) => {
				build.artifacts.unshift(newArtifact);
				return Promise.all([build.save()]);
			})
			.then(() => res.redirect(`/builds/${req.params.buildId}`))
			.catch((err) => {
				console.log(err);
			});
	});
	// Layer outside
};
