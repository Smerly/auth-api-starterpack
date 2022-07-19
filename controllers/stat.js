const Stat = require('../models/stat');
const User = require('../models/user');

module.exports = (app) => {
	// confuse line 10
	app.get('/', (req, res) => {
		const currentUser = req.user;
		Stat.find({})
			.lean()
			.populate('artifact')
			.then((posts) => res.render('posts-index', { posts, currentUser }))
			.catch((err) => {
				console.log(err.message);
			});
	});
	// Create
	app.get('/posts/new', (req, res) => {
		var currentUser = req.user;
		console.log('Loading posts-new');
		res.render('posts-new', { currentUser });
	});

	app.post('/posts/new', (req, res) => {
		if (req.user) {
			const post = new Post(req.body);
			const userId = req.user._id;
			post
				.save()
				.then(() => {
					return res.redirect(`/posts/${post._id}`);
				})
				.catch((err) => {
					console.log(err.message);
				});
		} else {
			return res.status(401);
		}
	});

	app.get('/posts/:id', (req, res) => {
		const currentUser = req.user;
		Post.findById(req.params.id)
			.populate('comments')
			.lean()
			.then((post) => res.render('posts-show', { post, currentUser }))
			.catch((err) => {
				console.log(err.message);
			});
	});
	app.get('/n/:subreddit', (req, res) => {
		const currentUser = req.user;
		const { subreddit } = req.params;
		Post.find({ subreddit })
			.lean()
			.populate('author')
			.then((posts) => res.render('posts-index', { posts, currentUser }))
			.catch((err) => {
				console.log(err);
			});
	});

	app.put('/posts/:id/vote-up', (req, res) => {
		Post.findById(req.params.id).then((err, post) => {
			post.upVotes.push(req.user._id);
			post.voteScore += 1;
			post.save();

			return res.status(200);
		});
	});

	app.put('/posts/:id/vote-down', (req, res) => {
		Post.findById(req.params.id).then((err, post) => {
			post.downVotes.push(req.user._id);
			post.voteScore -= 1;
			post.save();

			return res.status(200);
		});
	});
};

// -----
