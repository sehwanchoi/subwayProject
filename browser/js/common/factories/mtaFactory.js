'use strict';

app.factory('mtaFactory', function($http, $q, $timeout) {
  return {
    getServiceInfo: function() {
      // var deferred = $q.defer();


      return $http.get('/api/mta').then(function(response) {
        return response.data
      });
    }
  }
});