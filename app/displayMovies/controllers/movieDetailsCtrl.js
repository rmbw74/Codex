angular
    .module("codex")
    .controller("movieDetailsCtrl", function ($scope, $routeParams, databaseFactory, $location) {
        $scope.movie = {}
        $scope.formats = {}
        $scope.currentMovieFormats = []
        $scope.selectedItem = $scope.formats[0]
        //grab all the available formats in the database
        databaseFactory.all("formats").then(response => {
            $scope.formats = response
            //console.log("formats are",response)
        })
        //grab the details for the movie we have clicked on
        databaseFactory.single($routeParams.movieId).then(movie => {
            $scope.movie = movie
            $scope.currentMovieFormats = $scope.movie.format
            //console.log(currentMovieFormats)
            //console.log(movie)
        })
        //this function is a temporary one to add formats to firebase
        let createformats = () => {
            format = {
                "name": "Blu-Ray"
            }
            databaseFactory.add(format, "formats")
        }
        //this will be commented out unless we need to add more formats
        //createformats()
        $scope.addFormatToMovie = selectedFormat => {
            if($scope.currentMovieFormats[0] === "none"){
                $scope.currentMovieFormats.push(selectedFormat)
                $scope.currentMovieFormats.splice(0, 1)
                databaseFactory.replace($scope.movie,$routeParams.movieId)
            }else {
                $scope.movie.format.push(selectedFormat)
                //console.log("We add format", $scope.movie)
                databaseFactory.replace($scope.movie,$routeParams.movieId)

            }
        }
        //this function is called when the user clicks on a movie and will delete the movie from the DB
        $scope.removeMovie = () => {
            databaseFactory.remove($routeParams.movieId,"movies")
        }

    })









