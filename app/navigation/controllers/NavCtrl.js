angular
.module("codex").controller("NavCtrl",
function ($scope, $location, AuthFactory, $rootScope) {
    /*
    Just a pass-through method to the AuthFactory method of the
    same name.
    */
    $scope.isAuthenticated = () => AuthFactory.isAuthenticated()

    $rootScope.$on("authenticationSuccess", function () {
        $scope.email = AuthFactory.getUser().email
    })
    /*
    Unauthenticate the client.
    */
    $scope.logout = () => AuthFactory.logout()

}
)