'use strict';
app.config(function($stateProvider) {
  $stateProvider.state('profile', {
    url: '/profile',
    templateUrl: 'js/profile/profile.html',
    controller: 'profileCtrl'
  });
});

app.controller('profileCtrl', function($scope, AuthService, $http, mtaFactory, $sce, $timeout, socket, $modal) {


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
      console.log('TRAIN', train.status);
      if (train.status !== "GOOD SERVICE") {
        AuthService.getLoggedInUser().then(function(data) {
          $http.post('/api/sms', {
            data: data,
            train: train
          });
        })
      } else {
        console.log('The trains are in good service.')
      }
    })
  }

  $scope.disaster = function() {

    $scope.userTrains.map(function(train) {
      train.status = "DISASTER";
    })

    var modalInstance = $modal.open({
      templateUrl: 'modal.html',
      controller: 'profileCtrl'
    });

    $scope.sendMessage();
  }

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };

  socket.emit('disasterStatus', function() {
    console.log('getting here?');
    $scope.userTrains.map(function(train) {
      train.status = "DISASTER";
    })

  })


});