module.exports = {

  data: function () {
    return {
      user: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null
      },
      messages: [],
      registering: false
    }
  },

  methods: {
    registerUser: function (e) {
      e.preventDefault()
      var that = this
      that.registering = true
      client({ path: '/register', entity: this.user }).then(
        function (response) {
          that.getUserData()
        },
        function (response, status) {
          that.messages = []
          if (response.status && response.status.code === 422) {
            that.messages = []
            for (var key in response.entity) {
              that.messages.push({type: 'danger', message: response.entity[key]})
              that.registering = false
            }
          }
        }
      )

    },

    getUserData: function () {
      var that = this
      client({ path: '/users/me' }).then(
        function (response) {
          that.$dispatch('userHasLoggedIn', response.entity.user)
          that.$route.router.go('/auth/profile')
        }
      )
    }
  }
}
