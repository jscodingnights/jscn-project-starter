# Vue.js Starter Website
This package serves as a starter for you to build a single page Vue.js website. It uses vue-router and browserify to keep everyting nicely separated, and makes use of Laravel Elixir to avoid a huge Gulpfile (Laravel Elixir has nothing to do with the Laravel Framework, this package has no relation to that whatsoever).

A companion Laravel starter API is available [here](https://github.com/layer7be/vue-starter-laravel-api). The purpose is to have a Laravel API using Dingo and JWT Authentication. The API just serves the purpose of getting it working, so you can then adapt and plug in your own API (or simply adjust it to your needs, of course)

Online demo: http://vue.layer7.be/ (login as admin@example.com / admin)

[Companion Laravel API](https://github.com/layer7be/vue-starter-laravel-api)

Note: I made an experimental branch on Vue.js 1.0.0.rc [here](https://github.com/layer7be/vue-starter/tree/1.0.0). This will become master as soon
as 1.0.0 becomes stable.

## Usage

### Step 1: Install the dependencies
This will install the dependencies of this starter website. It will pull in several packages like Vue, Vueify, vue-router, gulp and Laravel Elixir (this is just magic syntactical sugar for gulp, basically).

```
npm install
```

### Step 2: Decide on the environment
In resources/assets/js/config you will find configuration files for the various environments you may have. By default, the "development" environment file will be loaded. If you want to load another configuration, you need to export the environment variable APP_ENV to be what you want to want the configuration to be. To do so easily you can precede the command gulp (or gulp watch) from the next step with APP_ENV=production if you want to build for production.


### Step 3: Run Gulp
Gulp will compile the Sass stylesheets and run browserify. All the source files are in the 'resources' folder and will publish the results to the 'public' folder.

```
gulp
```

As discussed in Step 2, you can opt to build for another environment, for example:

```
APP_ENV=production gulp
```

Note, this will work on Linux and MacOSX. If somebody knows how to do this properly from the command line in Windows (or if it's the same) please fork the repo and send a PR for this README.

### Step 4: Serve it
You can now serve the files using your webserver of choice.
If you would like to start a simple ad-hoc webserver to test this out, you can use the following one-liner:
```
cd public/
python -m SimpleHTTPServer 8888
```
and then hit http://localhost:8888

Or even better, you can use browser-sync and have your site auto-reload when changes are detected, which is ideal when developing.
```
npm install -g browser-sync
cd public/
browser-sync start --server --files "js/*.js, css/*.css"
```
browser-sync will then output the URL's on which you can access the site.

### Step 5: Login
If you followed the instructions in the companion repo and chose to use db:seed, you can now login using the following credentials:
```
username: admin@example.com
password: admin
```

## License
MIT License. See LICENSE file.

## Credits
Thanks Taylor Otwell for your Laravel Spark styling. I used some of it.
