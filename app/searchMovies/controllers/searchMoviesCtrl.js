angular
.module("codex")
.controller("searchMoviesCtrl", function ($scope, $routeParams, databaseFactory, AuthFactory, $location) {
   let currentUser = AuthFactory.getUser()
   $scope.userId = currentUser.uid

   

})