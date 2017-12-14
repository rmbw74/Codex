angular
    .module("codex")
    .controller("filterMoviesCtrl", function ($scope, $routeParams, databaseFactory, AuthFactory, $location) {
        let currentUser = AuthFactory.getUser()
        $scope.currentFilter = $routeParams.filterId
        $scope.userId = currentUser.uid
        $scope.currentFilters = []
        $scope.query = []
        $scope.userMoviesUnfiltered = []
        $scope.userMoviesFiltered = []
        $scope.hasResults = null

                if ($scope.query.length = 0){
                    $scope.hasResults = false
                }else {
                    $scope.hasResults = true

                }

        //this function grabs all formats from the database and builds a filter bar for use in the app
        $scope.buildFilterBar = () => databaseFactory.all("formats").then(response => {
            $scope.currentFilters = response
        })
        //this function grabs movies for the current user then filters them by the filterkey (format)
        $scope.filterUserMovies = () => databaseFactory.all("movies").then(response => {
            //console.log("We are in the grabUserMovies function")
            $scope.userMoviesUnfiltered = response.filter(movie => {
                let currentformatarray = movie.format
                //console.log(currentformatarray)
                return movie.uuid === currentUser.uid && currentformatarray.indexOf($routeParams.filterId) > -1
            })
            return $scope.userMoviesUnfiltered
        })
        //invoke the filter bar and filterfunctions
       $scope.buildFilterBar()
       $scope.filterUserMovies()


    })