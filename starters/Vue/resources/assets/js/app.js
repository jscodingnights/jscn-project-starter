module.exports = {

  ready: function () {

    this.$on('userHasLoggedOut', function () {
      this.destroyLogin()
    })

    this.$on('userHasLoggedIn', function (user) {
      this.setLogin(user)
    })

    // The app has just been initialized, check if we can get the user data with an already existing token
    var token = localStorage.getItem('jwt-token')
    if (token !== null && token !== 'undefined') {
      var that = this
      client({ path: '/users/me' }).then(
        function (response) {
          // User has successfully logged in using the token from storage
          that.setLogin(response.entity.user)
          // broadcast an event telling our children that the data is ready and views can be rendered
          that.$broadcast('data-loaded')
        },
        function (response) {
          // Login with our token failed, do some cleanup and redirect if we're on an authenticated route
          that.destroyLogin()
        }
      )
    }
  },

  data: function () {
    return {
      user: null,
      token: null,
      authenticated: false
    }
  },

  methods: {

    setLogin: function (user) {
      // Save login info in our data and set header in case it's not set already
      this.user = user
      this.authenticated = true
      this.token = localStorage.getItem('jwt-token')
    },

    destroyLogin: function (user) {
      // Cleanup when token was invalid our user has logged out
      this.user = null
      this.token = null
      this.authenticated = false
      localStorage.removeItem('jwt-token')
      if (this.$route.auth) this.$route.router.go('/auth/login')
    }
  }

}
