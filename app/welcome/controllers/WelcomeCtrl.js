app.controller("WelcomeCtrl", function($scope, AuthFactory) {
  $scope.currentUser = AuthFactory.getUser()
  $scope.email = $scope.currentUser.email
  $scope.welcome = "you logged in! Awesome!"

console.log($scope.email)

})