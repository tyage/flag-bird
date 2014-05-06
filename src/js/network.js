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
      chrome.socket.disconnect(socketId);
      chrome.socket.destroy(socketId);
    };

    $scope.connect = function($event) {
      chrome.socket.create('tcp', {}, function(createInfo) {
        var socketId = createInfo.socketId;
        chrome.socket.connect(socketId, $scope.ip, +$scope.port, function() {
          chrome.socket.getInfo(socketId, function(result) {
            if (result.connected) {
              disconnect($scope.socket);
              connect(socketId);
            } else {
              disconnect(socketId);
            }
            $scope.$apply();
          });
        });
      });
      $event.preventDefault();
    };
    $scope.send = function($event) {
      var data = str2ab($scope.data);
      chrome.socket.write($scope.socket, data, function(result) {
        $scope.bytesWritten = result.bytesWritten;
        $scope.$apply();
      });

      $event.preventDefault();
    };
  }]);
