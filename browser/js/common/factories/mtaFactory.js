'use strict';

app.factory('mtaFactory', function($http, $q, $timeout) {
    return {
        getServiceInfo: function() {
        	var deferred = $q.defer();
        	$timeout(function() {
        		deferred.resolve($http.get('/api/mta').then(function(response) {
        			return response.data
        		}))
        	}, 3000);
        	return deferred.promise;
        	}
        }
     });
            // return $http.get('/api/mta').then(function(response) {
            //     return response.data;
            // })