angular.module('networkTab', ['abConverter'])
  .controller('NetworkCtrl', ['$scope', 'abConverter', function($scope, abConverter) {
    var connect = function(socketId) {
      $scope.socket = socketId;
    };
    var disconnect = function(socketId) {
      if ($scope.socket === socketId) {
        $scope.socket = null;
      }
      if (socketId) {
        chrome.sockets.tcp.disconnect(socketId, function() {
          chrome.sockets.tcp.close(socketId);
        });
      }
    };

    $scope.packets = [];
    $scope.connect = function($event) {
      $scope.connectionStatus = 'start';
      chrome.sockets.tcp.create({}, function(createInfo) {
        var socketId = createInfo.socketId;
        chrome.sockets.tcp.connect(socketId, $scope.ip, +$scope.port, function(result) {
          if (result === 0) {
            $scope.connectionStatus = 'finish';
            disconnect($scope.socket);
            connect(socketId);
          } else {
            $scope.connectionStatus = 'failure';
            disconnect(socketId);
          }
          $scope.$apply();
        });
      });

      $event.preventDefault();
    };
    $scope.send = function($event) {
      $scope.packets.push({
        type: 'send',
        data: $scope.sendingData
      });
      var data = abConverter.str2ab($scope.sendingData);
      chrome.sockets.tcp.send($scope.socket, data, function(result) {
        $scope.bytesSent = result.bytesSent;
        $scope.$apply();
      });

      $event.preventDefault();
    };
    chrome.sockets.tcp.onReceive.addListener(function(data) {
      $scope.packets.push({
        type: 'receive',
        data: abConverter.ab2str(data.data)
      });
      $scope.$apply();
    });
  }]);
