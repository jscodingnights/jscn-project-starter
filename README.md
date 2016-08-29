# JavaScript Coding Nights - Project Starter

This is a shared framework for JSCN meetup projects.  

It will allow people to work on various technologies with a variety of available "themes" in which to build.

Futher, projects can live over time in one place, and more importantly (for me :)) it will allow for infrastructure reuse going forward.

**It is recommended that you (star and) fork this repository**

## Available Challenges

* [US Presidents](/challenges/us-presidents) - Create a voting app and choose the next leader of the free world!

## Challenge Setup

### Step 1: Clone/Fork this repository.

```
git clone https://github.com/jscodingnights/jscn-project-starter.git
```

### Step 2 (optional): Create a branch for your work on the night's task:

```
git checkout -b us-presidents
```

### Step 3: Create the project from one of the client starters

For example, if you're working on the **us-presidents** challenge, and you want to use the `React` client starter, copy the contents of the `clients/React` folder into `/challenges/us-presidents`:

```
cp -R ./clients/React/. ./challenges/us-presidents
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
