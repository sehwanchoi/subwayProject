'use strict';

app.factory('mtaFactory', function($http) {
    return {
        getServiceInfo: function() {
            return $http.get('/api/mta').then(function(response) {
                return response.data;
            });
        }
    };
});