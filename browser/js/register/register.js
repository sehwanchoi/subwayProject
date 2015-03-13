'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('register', {
        url: '/register',
        controller: 'registerCtrl',
        templateUrl: 'js/register/register.html'
    });
});

app.controller('registerCtrl', function($scope, registerFactory){
	
})