angular.module('hexViewerTab', [])
  .controller('HexViewerCtrl', ['$scope', function($scope) {
    $scope.data = [];

    $scope.byte2Hex = function(byte) {
      return ('0' + byte.charCodeAt(0).toString(16)).slice(-2);
    };
  }]);
