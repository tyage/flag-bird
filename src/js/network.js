angular.module('networkTab', [])
  .controller('NetworkCtrl', ['$scope', function($scope) {
    var str2ab = function(str) {
      var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
      var bufView = new Uint16Array(buf);
      for (var i=0, strLen=str.length; i<strLen; i++) {
        bufView[i] = str.charCodeAt(i);
      }
      return buf;
    }
    var connect = function(socketId) {
      $scope.socket = socketId;
    };
    var disconnect = function(socketId) {
      if (socketId) {
        chrome.sockets.tcp.close(socketId);
      }
    };

    $scope.connect = function($event) {
      chrome.sockets.tcp.create({}, function(createInfo) {
        var socketId = createInfo.socketId;
        chrome.sockets.tcp.connect(socketId, $scope.ip, +$scope.port, function(result) {
          if (result === 0) {
            disconnect($scope.socket);
            connect(socketId);
          } else {
            disconnect(socketId);
          }
          $scope.$apply();
        });
        chrome.sockets.tcp.disconnect(socketId, function() {});
      });
      $event.preventDefault();
    };
    $scope.send = function($event) {
      var data = str2ab($scope.data);
      chrome.sockets.tcp.send($scope.socket, data, function(result) {
        $scope.bytesWritten = result.bytesWritten;
        $scope.$apply();
      });

      $event.preventDefault();
    };
  }]);
