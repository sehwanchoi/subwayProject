app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, $state, loginFactory) {

    $scope.login = {};
    $scope.error = null;

    $scope.userLogin = function(users){
        loginFactory.checkUser(users).then(function(loggedin){
            // sessionStorage.loggedinUser = loggedin.email;
            $state.go('home');
        }).catch(function(){
            $scope.error = 'Invalid login credentials.';
        });
    };
    // $scope.sendLogin = function (loginInfo) {
    //     $scope.error = null;
    //     AuthService.login(loginInfo).then(function () {
    //         $state.go('home');
    //     }).catch(function () {
    //         $scope.error = 'Invalid login credentials.';
    //     });
    // };
});