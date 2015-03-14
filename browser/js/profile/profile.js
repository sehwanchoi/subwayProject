'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('profile', {
        url: '/profile',
        templateUrl: 'js/profile/profile.html',
        controller: 'profileCtrl'
    });
});

app.controller('profileCtrl', function($scope, AuthService, smsFactory) {

	$scope.sendMessage = function() {
		smsFactory.sendSMS().then(function(data) {
			return data
		})
	}
	
	AuthService.getLoggedInUser().then(function(data) {
		$scope.user = data;
	})

});