# Genshin Impact Artifact API

A tools for Genshin Impact players to be able to add artifact types and combine them to use for different artifact set combinations!

## How to run

**Go into project directory**
```cd genshin-artifact-api```

**Install project dependencies**
```npm install```

**Run it!**
```npm start```

## Models

**User**
Includes username (String)
Includes password (String)

```
{
		username: "Some Username",
		password: "Some Password",
		builds: [Build1.id, Build2.id],
		artifacts: [ Artifact1.id, Artifact2.id ],
},
```

**Artifact**

Includes a artifact set name (String)
Includes a creator/owner name (User)
```
{
		artifactSet: "Blizzard Strayer",
		owner: User.id,
},
```
**Build** (for artifacts per character)

Includes a name for build (String)
Includes 5 Artifact slots per each of 5 slots in one build (Artifact)
Includes the creator/owner of the build (User)
```
{
		name: "Build1",
		flower: Artifact.id,
		feather: Artifact.id,
		sands: Artifact.id,
		goblet: Artifact.id,
		circlet: Artifact.id,
		owner: User.id,
},
```

## Endpoints

**Builds**
* GET ```/```: Displays all builds
* GET ```/builds/new```: Create a new build form
* POST ```/builds/new```: Create a new build
* GET ```/builds/:id```: Get and see build by ID

**Artifacts**
* GET ```/allArtifacts```: Displays all artifacts
* GET ```/artifacts/new```: Create a new artifact form
* POST ```/artifacts/new```: Create a new artifact
* GET ```/artifacts/:id```: Get and see artifact by ID

**User**
* GET ```/sign-up```: Sign up form
* POST ```/sign-up```: Sign up new User
* GET ```/logout```: Logout of current User
* GET ```/login```: Login form
* POST ```/login```: Login to a User


