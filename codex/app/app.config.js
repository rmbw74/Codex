app.constant("FIREBASE_CONFIG", {
    apiKey: "AIzaSyD_XFHl54Voosjd9XeejzT9-2KHjVpR82c",
    authDomain: "codex-7c4db.firebaseapp.com",
    databaseURL: "https://codex-7c4db.firebaseio.com",
    projectId: "codex-7c4db",
    storageBucket: "codex-7c4db.appspot.com",
    messagingSenderId: "545121410789"
})
app.constant("TMDB_KEY", "18da23277f663e834d8659e554a6fc68")
angular.module("codex").run(function (FIREBASE_CONFIG) {
    firebase.initializeApp(FIREBASE_CONFIG)
})

let isAuth = AuthFactory => new Promise ((resolve, reject) => {
    if (AuthFactory.isAuthenticated()){
        console.log("User is authenticated, resolve route promise")
        resolve()
    } else {
        console.log("User is not authenticated, reject route promise")
        reject()
    }
})

angular.module("codex").config(function ($routeProvider) {
    /**
     * Configure all Angular application routes here
     */
    $routeProvider
        .when('/auth', {
            templateUrl: "app/auth/partials/register.html",
            controller: 'AuthCtrl'
        })
        .when('/welcome', {
            templateUrl: "app/welcome/partials/welcome.html",
            //controller: 'WelcomeCtrl',
            resolve: { isAuth }
        })
        .when('/apiSearch', {
            templateUrl: "app/apiSearch/partials/apiSearch.html",
            controller: 'apiSearchCtrl',
            resolve: { isAuth }
        })
        .when('/movies/detail/:movieId', {
            templateUrl: "app/displayMovies/partials/movieDetails.html",
            controller: 'movieDetailsCtrl',
            resolve: { isAuth }
        })
        .when('/filter/:filterId', {
            templateUrl: "app/filterMovies/partials/filterdisplay.html",
            controller: 'filterMoviesCtrl',
            resolve: { isAuth }
        }).when('/reports/', {
            templateUrl: "app/reporting/partials/reportDisplay.html",
            //controller: 'reportDataCtrl',
            resolve: { isAuth }
        })
        .otherwise('/auth')

})