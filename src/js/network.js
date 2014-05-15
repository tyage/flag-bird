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
      chrome.sockets.tcp.create({
        bufferSize: 8192
      }, function(createInfo) {
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
        string: $scope.sendingData
      });
      if ($scope.useCrlf) {
        $scope.sendingData = $scope.sendingData.replace(/\r\n/g, '\n');
        $scope.sendingData = $scope.sendingData.replace(/\r/g, '\n');
        $scope.sendingData = $scope.sendingData.replace(/\n/g, '\r\n');
      }
      var data = abConverter.str2ab($scope.sendingData);
      chrome.sockets.tcp.send($scope.socket, data, function() {});

      $event.preventDefault();
    };
    chrome.sockets.tcp.onReceive.addListener(function(data) {
      var raw = new Uint8Array(data.data);
      var rawHex = _.map(raw, function(byte) {
        return ('0' + byte.toString(16)).slice(-2);
      });
      var packet = {
        type: 'receive',
        raw: rawHex,
        string: abConverter.ab2str(data.data)
      };
      $scope.packets.push(packet);
      $scope.$apply();
    });
  }]);
