angular
    .module("codex")
    .controller("apiSearchCtrl", function (apiFactory, $scope) {
        $scope.results = []
        $scope.searchString = ""




        $scope.finder = event => {
            if (event.key === "Enter") {
                $scope.results = []
                apiFactory.list($scope.searchString).then(data => {
                    $scope.results = data[3]
                    console.log("results",$scope.results)
                    $scope.searchString = ""
                })
            }
        }

    })