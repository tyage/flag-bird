angular.module('networkTab', [])
  .controller('NetworkCtrl', ['$scope', function($scope) {
    function str2ab(str) {
      var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
      var bufView = new Uint16Array(buf);
      for (var i=0, strLen=str.length; i<strLen; i++) {
        bufView[i] = str.charCodeAt(i);
      }
      return buf;
    }

    $scope.send = function($event) {
      chrome.socket.create('tcp', {}, function(createInfo) {
        var socketId = createInfo.socketId;
        chrome.socket.connect(socketId, $scope.ip, +$scope.port, function() {
          var data = str2ab('test');
          chrome.socket.write(socketId, data, function() {});
        });
      });
      $event.preventDefault();
    };
  }]);
