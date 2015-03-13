'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('mta', {
        url: '/mta',
        templateUrl: 'js/mta/mta.html'
    });
});

app.controller('mtaCtrl', function ($scope, mtaFactory){
    mtaFactory.getServiceInfo().then(function(data){
        $scope.info = data;
        console.log(data);
    });
})