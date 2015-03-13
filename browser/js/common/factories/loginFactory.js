"use strict";
app.factory('loginFactory', function($http, AuthService){
	return {
		checkUser : function (users) {
			console.log("You are in login Factory!");
			return AuthService.login(users);
			// return $http.post('/api/login/newUser', user);
		}
	};
});