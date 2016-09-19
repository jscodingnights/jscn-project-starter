# JavaScript Coding Nights - Project Starter

This is a shared framework for JSCN meetup projects.  

It contains a number of challenges tailored toward experimenting with and learning different technologies via a variety of available application "challenges" to build.

Futher, projects can live over time in one place, and more importantly (for me :)) it will allow for infrastructure reuse going forward.

**It is recommended that you star this repository :D**

# Updating the JSCN Project Starter

With a clean working copy:

```
git fetch
git rebase origin/master
```


## Available Challenges

* [US President Voting App](/challenges/us-presidents.md) - Create a voting app and choose the next leader of the free world!
* [JSCN Chat](/challenges/chat.md) - Create a chat client to chat with other JSCN members.

## Server & Data

You can either run your own local server by running `npm install && npm start` in the JSCN Project Starter root, or you can consume the API (and share your data/chat with others at the meetup) by pointing your client at our heroku-hosted API:

```
https://jscn.herokuapp.com/
```

## Challenge Setup

### Step 1: Clone this repository.

```
git clone https://github.com/jscodingnights/jscn-project-starter.git
```

### Step 2: Create a new branch for your work on the night's task:

```
git checkout -b jscn-rocks
```

### Step 3: Clone one one of the client starters

For example, if you're working on the `us-presidents` challenge, and you want to use the `React` client starter, copy the contents of the `starters/React` folder into `/challenges/us-presidents-react`:

```
cp -R ./starters/React/. ./challenges/us-presidents-react
```

### Step 4: Initial commit

```
git add --all
git commit -m "Initial Commit"
```

### Step 5: Open your project, npm install, and start coding!

```
cd challenges/us-presidents
npm install
npm start
```
