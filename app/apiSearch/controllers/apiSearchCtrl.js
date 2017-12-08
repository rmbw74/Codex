angular
    .module("codex")
    .controller("apiSearchCtrl", function (apiFactory, $scope, $routeParams, databaseFactory, AuthFactory) {
        $scope.results = []
        $scope.searchString = ""
        let currentmovie = []
        let newmovie = {}
        let currentUser = AuthFactory.getUser()

        //this event listener sends the user search request to the api and returns the results
        $scope.finder = event => {
            if (event.key === "Enter") {
                //clear out the previous search results if there are any
                $scope.results = []
                apiFactory.TMDB_list($scope.searchString).then(data => {
                    $scope.results = data[3]
                    //console.log("results", $scope.results)
                    //clear out the user search input if there is any
                    $scope.searchString = ""
                })
            }
        }
        //this function grabs the movie that the user clicks on in the search partial
        $scope.grabMovie = event => {
            let movieId = event.target.id
            currentmovie = $scope.results.filter(movie => {
                    return movie.id == movieId
            })
            console.log("This is what we have decided is the current movie",currentmovie)
            addToDatabase(currentmovie)

        }
         //this funtion creates a movie object and adds the selected movie to firebase
         let addToDatabase = movie => {
            newmovie = {
                "uuid": currentUser.uid,
                "id": movie[0].id,
                "formatid": 0,
                "backdrop": movie[0].backdrop_path,
                "title": movie[0].title,
                "overview": movie[0].overview
            }
            //send object to database factory
            databaseFactory.add(newmovie, "movies")

        }
    })