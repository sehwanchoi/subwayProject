'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'homeCtrl'
    });
});

app.controller('homeCtrl', function($scope, $rootScope, $timeout, mtaFactory, AuthService, AUTH_EVENTS, $state) {


		// changed splice to slice 
		// combined groupOne and groupTwo into one function so that we don't call getService function twice 

		mtaFactory.getServiceInfo().then(function(status) {

			$scope.groupOne = [];
			$scope.groupTwo = [];


			var status1 = status.slice(0,5);
				$scope.groupOne.push(status1);
				$scope.groupOne = status1;
			

			var status2 = status.slice(5,10);
			$scope.groupTwo.push(status2);
			$scope.groupTwo = status2;
		})

		$scope.user = null;

		
		
		var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    $scope.user = user;
                });
            };

      	$rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);


	
})