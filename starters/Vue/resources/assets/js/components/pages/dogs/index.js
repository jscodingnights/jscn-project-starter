module.exports = {

  data: function () {
    return {
      dogs: [],
      messages: []
    }
  },

  methods: {
    // Let's fetch some dogs
    fetch: function (successHandler) {
      var that = this
      client({ path: '/dogs' }).then(
        function (response) {
          // Look ma! Puppies!
          that.$set('dogs', response.entity.data)
          successHandler(response.entity.data)
        },
        function (response, status) {
          if (_.contains([401, 500], status)) {
            that.$dispatch('userHasLoggedOut')
          }
        }
      )
    },

    deleteDog: function (index) {
      var that = this
      client({ path: '/dogs/' + this.dogs[index].id, method: 'DELETE' }).then(
        function (response) {
          that.dogs.splice(index, 1)
          that.messages = [{type: 'success', message: 'Great, dog purged.'}]
        },
        function (response) {
          that.messages.push({type: 'danger', message: 'There was a problem removing the dog'})
        }
      )
    }

  },

  route: {
    // Ooh, ooh, are there any new puppies yet?
    data: function (transition) {
      this.fetch(function (data) {
        transition.next({dogs: data})
      })
    }
  }

}
