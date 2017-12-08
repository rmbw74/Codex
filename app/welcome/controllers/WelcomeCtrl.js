app.controller("WelcomeCtrl", function($scope, AuthFactory, databaseFactory) {
  $scope.currentUser = AuthFactory.getUser()
  $scope.hasMovies = false
  $scope.email = $scope.currentUser.email
  $scope.welcome = "you logged in! Awesome!"

$scope.checkformovies = () => {
  let movies = databaseFactory.all("movies").then(response => {
    currentuserid = $scope.currentUser.uid
    usermovies = response.filter(movie => {
      return movie.uuid === currentuserid
    })
    console.log("this is the response in checkformovies",usermovies)
    if (usermovies.length > 0){
      $scope.hasMovies = true
    }
  })
}
$scope.checkformovies()
})