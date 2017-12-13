angular
    .module("codex")
    .controller("reportDataCtrl", function ($scope, databaseFactory, AuthFactory) {
        let currentUser = AuthFactory.getUser()
        $scope.userId = currentUser.uid
        $scope.userMovies = []
        $scope.TotalMovies = 0
        $scope.TotalDVD = 0
        $scope.TotalBluRay = 0
        $scope.TotalDigital = 0
        $scope.Total4K = 0
        $scope.TotalUnformatted = 0
        let userMoviesFromResponse = []

        let userMovies = databaseFactory.all("movies").then(response => {
            userMoviesFromResponse = response.filter(movie => {
                return movie.uuid === currentUser.uid
            })
            $scope.userMovies = userMoviesFromResponse
            userMoviesFromResponse.forEach(movie => {
                console.log(movie)
                let currentArray = movie.format
                if (currentArray.indexOf("DVD") > -1) {
                    $scope.TotalDVD += 1
                    $scope.TotalMovies += 1
                }
                if (currentArray.indexOf("Blu-Ray") > -1) {
                    $scope.TotalBluRay += 1
                    $scope.TotalMovies += 1
                }
                if (currentArray.indexOf("Digital") > -1) {
                    $scope.TotalDigital += 1
                    $scope.TotalMovies += 1
                }
                if (currentArray.indexOf("4kUltraHD") > -1) {
                    $scope.Total4K += 1
                    $scope.TotalMovies += 1
                }
            })
        })

    })