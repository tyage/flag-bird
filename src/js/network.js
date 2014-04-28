angular.module('socketTab', [])
  .controller('SocketCtrl', ['$scope', function($scope) {
    $scope.send = function($event) {
      chrome.socket.tcp.create({}, function(createInfo) {
        console.log(createInfo);
        chrome.sockets.tcp.connect(createInfo.socketId, $scope.ip, $scope.port, function() {
          console.log(arguments);
        });
      });
      $event.preventDefault();
    };
  }]);
