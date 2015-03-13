'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'homeCtrl'
    });
});

app.controller('homeCtrl', function($scope, mtaFactory) {

	mtaFactory.getServiceInfo().then(function(status) {
		$scope.groupOne = [];
		var status1 = status.splice(0,5);
		$scope.groupOne.push(status1);
		$scope.groupOne = status1;
	})

	mtaFactory.getServiceInfo().then(function(status) {
		$scope.groupTwo = [];
		var status2 = status.splice(5,9);
		$scope.groupTwo.push(status2);
		$scope.groupTwo = status2;
	})


		





})