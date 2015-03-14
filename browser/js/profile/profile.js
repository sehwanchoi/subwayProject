'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('profile', {
        url: '/profile',
        templateUrl: 'js/profile/profile.html',
        controller: 'profileCtrl'
    });
});

app.controller('profileCtrl', function($scope, AuthService, smsFactory, mtaFactory, $sce) {

	$scope.sendMessage = function() {
		smsFactory.sendSMS().then(function(data) {
			return data
		})
	}

	AuthService.getLoggedInUser().then(function(data) {
		$scope.user = data;

		mtaFactory.getServiceInfo().then(function(data) {
			$scope.userTrains = [];
			var trainNames = _.pluck(data, "name");
			console.log('pluck train names', trainNames);
			console.log('user trains', $scope.user.commute);
			$scope.user.commute.forEach(function(train) {
				var userTrain = {};
				var index = trainNames.indexOf(train);
				if(index == -1) {
					console.log('error: cannot find index of train');
				} else {
					userTrain.name = data[index].name;
					userTrain.status = data[index].status;
					// userTrain.text = $sce.trustAsHtml(data[index].text);
					$scope.userTrains.push(userTrain);
				}

			})


			console.log('user train', $scope.userTrains);

		})

	})

});