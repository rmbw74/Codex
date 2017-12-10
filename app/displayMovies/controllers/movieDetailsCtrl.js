angular
.module("codex")
.controller("movieDetailsCtrl", function ($scope, $routeParams, databaseFactory, $location) {
 $scope.movie = {}
 databaseFactory.single($routeParams.movieId).then(movie => {
    $scope.movie = movie
 })

 
  console.log("We are in the details controller",$scope.movie)
})