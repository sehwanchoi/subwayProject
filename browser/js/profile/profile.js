'use strict';
app.config(function($stateProvider) {
  $stateProvider.state('profile', {
    url: '/profile',
    templateUrl: 'js/profile/profile.html',
    controller: 'profileCtrl'
  });
});

app.controller('profileCtrl', function($scope, AuthService, $http, mtaFactory, $sce, $timeout, socketFactory) {


  AuthService.getLoggedInUser().then(function(data) {
    $scope.user = data;

    mtaFactory.getServiceInfo().then(function(data) {
      $scope.userTrains = [];
      var trainNames = _.pluck(data, "name");
      console.log('pluck train names', trainNames);
      console.log('user trains', $scope.user.commute);
      $scope.user.commute.forEach(function(train) {
        var userTrain = {};
        var index = trainNames.indexOf(train);
        if (index == -1) {
          console.log('error: cannot find index of train');
        } else {
          userTrain.name = data[index].name;
          userTrain.status = data[index].status;
          // userTrain.text = $sce.trustAsHtml(data[index].text);
          $scope.userTrains.push(userTrain);
        }

      })

      console.log('user train', $scope.userTrains);

    })

  })

  $scope.sendMessage = function() {
    $scope.userTrains.forEach(function(train) {
      console.log('TRAIN', train);
      AuthService.getLoggedInUser().then(function(data) {
        $http.post('/api/sms', {data: data, train: train});
      })
    })
  }

  $scope.disaster = function() {
      console.log("getting here");
        console.log('socket emitted?');
        $scope.userTrains.map(function(train) {
          train.status = "DISASTER";
        })
      
    })

    // console.log("usertrains", $scope.userTrains);

    // $timeout(function() {
    //   $scope.$apply();
    // })

  };

});