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
		$scope.allStatus = status;
	})


})