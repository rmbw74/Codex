angular
.module("codex")
.controller("displayMoviesCtrl", function ($scope, $routeParams, databaseFactory, AuthFactory) {
   let currentUser = AuthFactory.getUser()

   $scope.userId = currentUser.uid

   let allmovies = databaseFactory.all("movies").then(response => {

       $scope.userMovies = response.filter( movie => {
           return movie.uuid === currentUser.uid
       })
        console.log("usermovies", $scope.userMovies)
   })
})