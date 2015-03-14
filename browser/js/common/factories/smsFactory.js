'use strict'

app.factory('smsFactory', function($http) {
  return {
    sendSMS: function(message) {
      return $http.post('/api/sms', {message}).then(function(response) {
        return response.data;
      });
    }
  }

})