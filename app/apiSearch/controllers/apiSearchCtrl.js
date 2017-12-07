angular
    .module("codex")
    .controller("apiSearchCtrl", function (apiFactory, $scope) {
        $scope.results = []
        $scope.searchString = ""


        $scope.addMovie = event => console.log(event)

        $scope.finder = event => {
            if (event.key === "Enter") {
                $scope.results = []
                apiFactory.TMDB_list($scope.searchString).then(data => {
                    $scope.results = data[3]
                    console.log("results",$scope.results)
                    $scope.searchString = ""
                })
            }
        }

    })