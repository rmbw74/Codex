app
.factory("dataBaseFactory", function (AuthFactory, $http){
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
        }).then(data => {
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
      value: function (data, id, areaInDb, toChange) {
        return AuthFactory.getUser().getIdToken(true)
          .then(idToken => {
            return $http({
              "url": `${firebaseURL +areaInDb}/${id}/${toChange}.json?auth=${idToken}`,
              "method": "PUT",
              "data": data
            })
          }).catch(function(error) {
            notify.log("Error while updating the article. Please try again.")
          })
      }
    }
  })
})