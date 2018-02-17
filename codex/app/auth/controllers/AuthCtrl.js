app.controller("AuthCtrl", function ($scope, AuthFactory, $location) {
  $scope.auth = {}


  $scope.loginUser = function (credentials) {
    AuthFactory.authenticate(credentials).then(function (didLogin) {
      $scope.login = {}
      $scope.register = {}
      $location.url('/welcome')
    })
  }

  $scope.logoutUser = function () {
    AuthFactory.logout()
    $location.url('/auth')
  }


  $scope.registerUser = function (registerNewUser) {
    AuthFactory.registerWithEmail(registerNewUser).then(function (didRegister) {
      console.log(didRegister)
    })
  }
})