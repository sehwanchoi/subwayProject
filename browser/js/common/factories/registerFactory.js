'use strict'

app.factory('registerFactory', function($http){
	return {
		getCoffeeDb: function() {
            return $http.get('/api/register').then(function(response) {
                return response.data;
       		});
        }
	}
})