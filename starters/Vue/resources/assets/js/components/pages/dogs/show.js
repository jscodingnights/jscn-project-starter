module.exports = {

  data: function () {
    return {
      dog: {
        id: null,
        name: null,
        age: null
      },
      messages: []
    }
  },

  methods: {
    // Let's fetch the dog
    fetch: function (id, successHandler) {
      var that = this
      client({ path: '/dogs/' + id }).then(
        function (response) {
          that.$set('dog', response.entity.data)
          successHandler(response.entity.data)
        },
        function (response, status, request) {
          // Go tell your parents that you've messed up somehow
          if (status === 401) {
            self.$dispatch('userHasLoggedOut')
          } else {
            console.log(response)
          }
        }
      )
    },

    updateDog: function (e) {
      e.preventDefault()
      var self = this
      client({ path: '/dogs/' + this.dog.id, entity: this.dog, method: 'PUT'}).then(
        function (response) {
          self.messages = []
          self.messages.push({type: 'success', message: 'Woof woof! Your dog was updated'})
        },
        function (response) {
          self.messages = []
          for (var key in response.entity) {
            self.messages.push({type: 'danger', message: response.entity[key]})
          }
        }
      )
    }

  },

  route: {
    // Ooh, ooh, are there any new puppies yet?
    data: function (transition) {
      this.fetch(this.$route.params.id, function (data) {
        transition.next({dog: data})
      })
    }
  }
}
