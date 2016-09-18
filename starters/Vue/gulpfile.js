// Disable notify
process.env.DISABLE_NOTIFIER = true

// I need some magic
var elixir = require('laravel-elixir')
require('elixir-vuemaker')

elixir.config.js.browserify.transformers.push({ name: 'envify' })

// Generate source map for easier debugging in dev tools
elixir.config.js.browserify.options.debug = true

elixir(function (mix) {
  mix.sass('app.scss')
     .vuemaker([
       'resources/assets/js/components/**/*.+(js|css|html)',
       'resources/assets/js/app.+(js|css|html)'
     ], 'resources/assets/js/compiled')
     .browserify('bootstrap.js', 'public/js/app.js')
})
