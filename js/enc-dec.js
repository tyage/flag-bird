angular.module('encDecTab', [])
  .controller('EncDecCtrl', ['$scope', function($scope) {
    $scope.encodedFocus = false;
    $scope.decodedFocus = false;
    $scope.methods = {
      base64: CryptoJS.enc.Base64,
      hex: CryptoJS.enc.Hex
    };
    $scope.method = $scope.methods.base64;
    $scope.$watch('decoded', function(newVal) {
      if ($scope.encodedFocus) {
        return;
      }
      if (!newVal) {
        $scope.encoded = '';
        return;
      }
      var str = CryptoJS.enc.Utf8.parse(newVal);
      $scope.encoded = str.toString($scope.method);
    });
    $scope.$watch('encoded', function(newVal) {
      if ($scope.decodedFocus) {
        return;
      }
      if (!newVal) {
        $scope.decoded = '';
        return;
      }
      var str = $scope.method.parse(newVal);
      $scope.decoded = str.toString(CryptoJS.enc.Utf8);
    });
  }]);
