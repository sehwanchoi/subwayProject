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
		name: ""
	};

	$scope.subwayName = mtaFactory.getServiceInfo().then(function(train){
		$scope.subwayName = train;
	})

	$scope.setLine = function() {
			$scope.user.commute = train;
			console.log('what here', train);
	}

	$scope.subwayClick = function() {
		$scope.ifSubway = !$scope.ifSubway;
	}


	// scroll down on click 
	
	$(function(){
		$("#firstb").click(function() {
		    $('html,body').animate({
		        scrollTop: $("#second").offset().top},
		        'slow');
		});

		$("#secondb").click(function() {
		    $('html,body').animate({
		        scrollTop: $("#third").offset().top},
		        'slow');
		});

		$("#thirdb").click(function() {
		    $('html,body').animate({
		        scrollTop: $("#fourth").offset().top},
		        'slow');
		});
		$("#fourthb").click(function() {
		    $('html,body').animate({
		        scrollTop: $("#fifth").offset().top},
		        'slow');
		});
	})

	$scope.addNewUser = function (newUser){
		registerFactory.createNewUser(newUser).then(function(data){
			console.log("hello in controler: ", data)
			if(data !== null)
			$window.location.href = '/';
		});
	};

})