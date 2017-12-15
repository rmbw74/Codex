angular
    .module("codex")
    .controller("displayMoviesCtrl", function ($scope, $routeParams, databaseFactory, AuthFactory, $location, $rootScope) {
        let currentUser = AuthFactory.getUser()
        $scope.query = []
        $scope.userId = currentUser.uid
        $scope.userMovies = []
        $scope.hasResults = null
        $scope.isHidden = true;
        $scope.showHide = function () {
            //If DIV is hidden it will be visible and vice versa.
            console.log("clicked")
            $scope.isHidden = $scope.isHidden ? false : true;
            console.log($scope.isHidden)
            }

        if ($scope.query.length = 0){
            $scope.hasResults = false
        }else {
            $scope.hasResults = true

        }
        //console.log($scope.query)
        let allmovies = databaseFactory.all("movies").then(response => {

            $scope.userMovies = response.filter(movie => {
                return movie.uuid === currentUser.uid
            })
        })
    })