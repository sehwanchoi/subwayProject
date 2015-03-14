'use strict';

app.factory('mtaFactory', function($http, $interval) {
    return {
    	
        getServiceInfo: function() {
        	
            return $http.get('/api/mta').then(function(response) {
                return response.data;
            });
        }
    };
});