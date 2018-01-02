angular
    .module("codex")
    .controller("movieDetailsCtrl", function ($scope, $routeParams, databaseFactory, $location,$timeout) {
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
            //check to see if the current movie is already owned in a particular format (will return -1 if exists)
            if ($scope.currentMovieFormats.indexOf(selectedFormat) < 0)
            {
                //if the current movie has not been formated, remove none then replace with new format
                if($scope.currentMovieFormats[0] === "none"){
                    $scope.currentMovieFormats.push(selectedFormat)
                    $scope.currentMovieFormats.splice(0, 1)
                    databaseFactory.replace($scope.movie,$routeParams.movieId)
                }else {
                    //if movie is already formatted, just add new format to array and then send movie to firebase.
                    $scope.movie.format.push(selectedFormat)
                    databaseFactory.replace($scope.movie,$routeParams.movieId)

                }

            }else{
                alert("You aleady own the movie in this format, try again")
            }
        }
        //this function will remove a selected format when the user chooses a format a clicks the remove format button
        $scope.removeFormat = selectedFormat => {
            //find what index that the selected format is in the current movie
            let indexToRemove = $scope.movie.format.indexOf(selectedFormat)
            //if the format exists in the array than splice the format off the array and the array is > 0
            if ($scope.movie.format.length > 0 && indexToRemove > -1){
                $scope.movie.format.splice(indexToRemove,1)
                //if all formats are removed from the film, push the "none" format back to the array
                if ($scope.movie.format.length < 1){
                    $scope.movie.format.push("none")
                    //push the  movie back to firebase
                    databaseFactory.replace($scope.movie, $routeParams.movieId)
                //push the movie back to firebase
                databaseFactory.replace($scope.movie, $routeParams.movieId)
            }


        }
        //this function is called when the user clicks on a movie and will delete the movie from the DB
        //and return the user to the welcome screen
        $scope.removeMovie = () => {
            //call database remove function pass it the movieId
            databaseFactory.remove($routeParams.movieId,"movies")
            //send the user back to the welcome
            $timeout(function () {
                $location.url("/welcome")
            }, 500)

        }

    })






