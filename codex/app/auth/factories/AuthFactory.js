angular.module("codex")
.factory("AuthFactory", function ($http, $timeout, $location, $route, $rootScope) {
    let currentUserData = null

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            currentUserData = user
            console.log("User is authenticated")

            if($location.url() !== "/welcome"){
                $timeout(function () {
                    $location.url("/welcome")
                }, 100);
            }else {
                $route.reload()
            }
            $rootScope.$broadcast("authenticationSuccess")
        } else {
            currentUserData = null
            console.log("User is not authenticated")
            $timeout(function () {
                $location.url("/auth")
            }, 100);
        }
    })

    return Object.create(null, {
        isAuthenticated: {
            value: () => {
                const user = currentUserData
                return user ? true : false
            }
        },
        getUser: {
            value: () => firebase.auth().currentUser
        },
        logout: {
            value: () => firebase.auth().signOut()
        },
        authenticate: {
            value: credentials =>
                firebase.auth()
                        .signInWithEmailAndPassword(
                            credentials.email,
                            credentials.password
                        )
        },
        registerWithEmail: {
            value: user =>
                firebase.auth()
                        .createUserWithEmailAndPassword(
                            user.email,
                            user.password
                        )
        }
    })
})