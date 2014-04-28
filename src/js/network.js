angular.module('networkTab', [])
  .controller('NetworkCtrl', ['$scope', function($scope) {
    $scope.send = function($event) {
      chrome.socket.create('tcp', {}, function(createInfo) {
        console.log(createInfo);
        chrome.sockets.connect(createInfo.socketId, $scope.ip, $scope.port, function() {
          console.log(arguments);
        });
      });
      $event.preventDefault();
    };
  }]);
