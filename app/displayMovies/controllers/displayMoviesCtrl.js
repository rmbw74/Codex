angular
    .module("codex")
    .controller("displayMoviesCtrl", function ($scope, $routeParams, databaseFactory, AuthFactory, $location) {
        let currentUser = AuthFactory.getUser()
        $scope.query = []
        $scope.userId = currentUser.uid
        $scope.userMovies = []
        console.log($scope.query)
        let allmovies = databaseFactory.all("movies").then(response => {

            $scope.userMovies = response.filter(movie => {
                return movie.uuid === currentUser.uid
            })
            console.log("usermovies", $scope.userMovies)
        })
    })