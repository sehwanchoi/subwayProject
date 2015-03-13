'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('register', {
        url: '/register',
        controller: 'registerCtrl',
        templateUrl: 'js/register/register.html'
    });
});

app.controller('registerCtrl', function($scope, registerFactory, $window, $location){

	$scope.user = {
		password:"",
		email:"",
		phoneNumber:"",
		name: ""
	};

	$scope.addNewUser = function (newUser){
		registerFactory.createNewUser(newUser).then(function(data){
			console.log("hello in controler: ", data)
			if(data !== null)
			$window.location.href = '/';
		});
	};

})