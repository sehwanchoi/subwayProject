'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('register', {
        url: '/register',
        controller: 'registerCtrl',
        templateUrl: 'js/register/register.html'
    });
});

app.controller('registerCtrl', function($scope, registerFactory, $window, $location, mtaFactory){

	$scope.user = {
		name: "",
		email:"",
		password:"",
		phoneNumber:"",
		time: "",
		commute: ""
	};

	$scope.subwayName = mtaFactory.getServiceInfo().then(function(train){
		$scope.subwayName = train;
	})

	$scope.setLine = function() {
			$scope.user.commute = train;
			console.log('what here', train);
		})
	}

	$scope.subwayClick = function() {
		$scope.ifSubway = !$scope.ifSubway;
	}

	$scope.addNewUser = function (newUser){
		registerFactory.createNewUser(newUser).then(function(data){
			console.log("hello in controler: ", data)
			if(data !== null)
			$window.location.href = '/';
		});
	};

})