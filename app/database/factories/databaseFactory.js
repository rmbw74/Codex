angular
.module("codex")
.factory("databaseFactory", function (AuthFactory, $http){
  const firebaseURL = "https://codex-7c4db.firebaseio.com/"
  return Object.create(null, {
    "cache": {
      value: null,
      writable: true
    },
    "all": {
      value: function (areaInDb) {
        return $http({
          "url": `${firebaseURL+areaInDb}/.json`,
          "method": "GET"
        }).then(response => {
          let data = response.data
          console.log("This is the response from databaseFactory", data)
          this.cache = Object.keys(data)
            .map(key => {
              data[key].id = key
              return data[key]
            })

          return this.cache
        })
      }
    },
    "add": {
      value: function (data, areaInDb) {
        return AuthFactory.getUser().getIdToken(true)
          .then(idToken => {
            return $http({
              "url": `${firebaseURL+areaInDb}/.json?auth=${idToken}`,
              "method": "POST",
              "data": data
            })
          }).catch(function(error) {
            notify.log("Error while adding the article. Please try again.")
          })
      }
    },
    "remove": {
      value: function (id, areaInDb) {
        return AuthFactory.getUser().getIdToken(true)
          .then(idToken => {
            return $http({
              "url": `${firebaseURL +areaInDb}/${id}/.json?auth=${idToken}`,
              "method": "DELETE"
            })
          }).catch(function(error) {
            notify.log("Error while deleting the article. Please try again.")
          })
      }
    },
    "replace": {
      value: function (data, key) {
        return AuthFactory.getUser().getIdToken(true)
          .then(idToken => {
            return $http({
              "url": `${firebaseURL}/movies/${key}/.json?auth=${idToken}`,
              "method": "PUT",
              "data": data
            })
          }).catch(function(error) {
            notify.log("Error while updating the article. Please try again.")
          })
      }
    },
    "single": {
      value: function (key) {
          return $http({
              method: "GET",
              url: `${firebaseURL}/movies/${key}/.json`
          }).then(response => {
              return response.data
          })
      }
  },
  })
})