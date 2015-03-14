'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'homeCtrl'
    });
});

app.controller('homeCtrl', function($scope, $interval, mtaFactory, AuthService) {
	
	$interval(
	mtaFactory.getServiceInfo().then(function(status) {
		$scope.trainStatus = status;
		$scope.groupOne = [];
		var status1 = status.splice(0,5);
		$scope.groupOne.push(status1);
		$scope.groupOne = status1;
		$sco
	}), 10000);

	mtaFactory.getServiceInfo().then(function(status) {
		$scope.groupTwo = [];
		var status2 = status.splice(5,9);
		$scope.groupTwo.push(status2);
		$scope.groupTwo = status2;
	})

	$scope.user = AuthService.isAuthenticated();

})