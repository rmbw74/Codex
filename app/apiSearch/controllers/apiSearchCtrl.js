angular
    .module("codex")
    .controller("apiSearchCtrl", function (apiFactory, $scope, $routeParams, databaseFactory, AuthFactory) {
        $scope.results = []
        $scope.searchString = ""
        let currentmovie = []
        let newmovie = {}
        let currentUser = AuthFactory.getUser()
        let basepath = "https://image.tmdb.org/t/p/w154"
        let detailpath = "https://image.tmdb.org/t/p/w300"

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
            //console.log(event)
            let movieId = parseInt(event.target.id)
            currentmovie = $scope.results.filter(movie => {
                    return movie.id === movieId
            })
            console.log("This is what we have decided is the current movie",currentmovie)
            addToDatabase(currentmovie)

        }
         //this funtion creates a movie object and adds the selected movie to firebase
         let addToDatabase = movie => {
            newmovie = {
                "uuid": currentUser.uid,
                "id": movie[0].id,
                "format": ["none"],
                "backdrop": basepath + movie[0].poster_path,
                "poster": detailpath + movie[0].poster_path,
                "title": movie[0].title,
                "overview": movie[0].overview,
                "dateAdded":Date.now()
            }
            //send object to database factory
            databaseFactory.add(newmovie, "movies")

        }
    })