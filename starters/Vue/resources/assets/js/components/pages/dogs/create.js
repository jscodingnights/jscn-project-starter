module.exports = {
  data: function () {
    return {
      dog: {
        name: '',
        age: ''
      },
      messages: [],
      creating: false
    }
  },

  methods: {
    createDog: function (e) {
      e.preventDefault()
      var that = this
      that.creating = true
      client({path: 'dogs', entity: this.dog}).then(
        function (response, status) {
          that.dog.name = ''
          that.dog.age = ''
          that.messages = [ {type: 'success', message: 'Woof woof! Your dog was created'} ]
          Vue.nextTick(function () {
            document.getElementById('nameInput').focus()
          })
          that.creating = false
        },
        function (response, status) {
          that.messages = []
          for (var key in response.entity) {
            that.messages.push({type: 'danger', message: response.entity[key]})
            that.creating = false
          }
        }
      )
    }
  }
}
