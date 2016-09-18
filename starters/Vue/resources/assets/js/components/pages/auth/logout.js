module.exports = {

  route: {
    activate: function (transition) {
      this.$root.authenticated = false
      this.$root.user = null
      localStorage.removeItem('user')
      localStorage.removeItem('jwt-token')
      transition.redirect('/')
    }
  }

}
