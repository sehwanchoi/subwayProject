'use strict';

app.factory('mtaFactory', function($http, $q, $timeout) {
  return {
    getServiceInfo: function() {
      var deferred = $q.defer();

      deferred.resolve($http.get('/api/mta').then(function(response) {
        return response.data
      }))

      return deferred.promise;
    }
  }
});