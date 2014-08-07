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
    var ab2Hex = function(ab) {
      var raw = new Uint8Array(ab);
      return _.map(raw, function(byte) {
        return ('0' + byte.toString(16)).slice(-2);
      });
    };

    $scope.packets = [];
    $scope.connect = function($event) {
      $scope.connectionStatus = 'start';
      chrome.sockets.tcp.create({
        bufferSize: 8192
      }, function(createInfo) {
        var socketId = createInfo.socketId;
        chrome.sockets.tcp.connect(socketId, $scope.host, +$scope.port, function(result) {
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
      if ($scope.useCrlf) {
        $scope.sendingData = $scope.sendingData.replace(/\r\n/g, '\n');
        $scope.sendingData = $scope.sendingData.replace(/\r/g, '\n');
        $scope.sendingData = $scope.sendingData.replace(/\n/g, '\r\n');
      }
      var data = abConverter.str2ab($scope.sendingData);
      chrome.sockets.tcp.send($scope.socket, data, function() {});
      chrome.sockets.tcp.getInfo($scope.socket, function(socket) {
        $scope.packets.push({
          type: 'send',
          peer: {
            address: socket.peerAddress,
            port: socket.peerPort
          },
          local: {
            address: socket.localAddress,
            port: socket.localPort
          },
          string: $scope.sendingData,
          raw: ab2Hex(data),
          tab: 'string'
        });
        $scope.$apply();
      });

      $event.preventDefault();
    };
    $scope.hex2Char = function(hex) {
      var charCode = parseInt(hex, 16);
      return String.fromCharCode(charCode);
    };
    $scope.deletePacket = function(packet) {
      var index = $scope.packets.indexOf(packet);
      $scope.packets.splice(index, 1);
    };

    chrome.sockets.tcp.onReceive.addListener(function(data) {
      chrome.sockets.tcp.getInfo(data.socketId, function(socket) {
        $scope.packets.push({
          type: 'receive',
          peer: {
            address: socket.peerAddress,
            port: socket.peerPort
          },
          local: {
            address: socket.localAddress,
            port: socket.localPort
          },
          string: abConverter.ab2str(data.data),
          raw: ab2Hex(data.data),
          tab: 'string'
        });
        $scope.$apply();
      });
    });
  }]);
