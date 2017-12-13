angular
.module("codex")
.factory("reportDataFactory", function (AuthFactory, $http){
  const firebaseURL = "https://codex-7c4db.firebaseio.com/"
  let currentUser = AuthFactory.getUser()
  return Object.create(null, {
    "cache": {
      value: null,
      writable: true
    },
    "usermovies": {
      value: function () {
        return $http({
          "url": `${firebaseURL}/movies/.json`,
          "method": "GET"
        }).then(response => {
          let data = response.data
          let userdata = data.filter(movie => {
              return movie.uuid === currentUser.uid
          })
          //console.log("This is the response from databaseFactory", data)
          this.cache = Object.keys(userdata)
            .map(key => {
              userdata[key].id = key
              return userdata[key]
            })

          return this.cache
        })
      }
    },
    "user"

  })
})