'use strict'

app.factory('registerFactory', function($http){
	return {
		createNewUser: function(user) {
            return $http.post('/api/register', user).then(function(response) {
                return response.data;
       		});
        }
	}
})