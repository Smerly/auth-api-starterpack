const app = require('./../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('Artifacts', function () {
	const newArtifact = {
		artifactSet: 'Emblem of Severed Fate',
	};
	const user = {
		username: 'poststest',
		password: 'testposts',
	};

	before(function (done) {
		agent
			.post('/sign-up')
			.set('content-type', 'application/x-www-form-urlencoded')
			.send(user)
			.then(function (res) {
				done();
			})
			.catch(function (err) {
				done(err);
			});
	});
	it('should create a new artifact at /artifacts/new', function (done) {
		Post.estimatedDocumentCount()
			.then(function (initialDocCount) {
				agent
					.post('/artifacts/new')
					// This line fakes a form post,
					// since we're not actually filling out a form
					.set('content-type', 'application/x-www-form-urlencoded')
					// Make a request to create another
					.send(newArtifact)
					.then(function (res) {
						Artifact.estimatedDocumentCount()
							.then(function (newDocCount) {
								// Check that the database has status 200
								res.should.have.status(200);
								// Check that the database has one more post in it
								newDocCount.should.equal(initialDocCount + 1);
								done();
							})
							.catch(function (err) {
								done(err);
							});
					})
					.catch(function (err) {
						done(err);
					});
			})
			.catch(function (err) {
				done(err);
			});
	});
	after(function (done) {
		Artifact.findOneAndDelete(newArtifact)
			.then(function () {
				agent.close();

				User.findOneAndDelete({
					username: user.username,
				})
					.then(function () {
						done();
					})
					.catch(function (err) {
						done(err);
					});
			})
			.catch(function (err) {
				done(err);
			});
	});
});
