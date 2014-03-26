angular.module('encDecTab', [])
  .controller('EncDecCtrl', ['$scope', function($scope) {
    var cryptoJsEnc = function(str, method) {
      var utf8Str = CryptoJS.enc.Utf8.parse(str);
      return utf8Str.toString(method);
    };
    var cryptoJsDec = function(str, method) {
      var decodedStr = method.parse(str);
      return decodedStr.toString(CryptoJS.enc.Utf8);
    };
    $scope.encodedFocus = false;
    $scope.decodedFocus = false;
    $scope.methods = {
      base64: {
        enc: function(str) {
          return cryptoJsEnc(str, CryptoJS.enc.Base64);
        },
        dec: function(str) {
          return cryptoJsDec(str, CryptoJS.enc.Base64);
        },
      },
      hex: {
        enc: function(str) {
          return cryptoJsEnc(str, CryptoJS.enc.Hex);
        },
        dec: function(str) {
          return cryptoJsDec(str, CryptoJS.enc.Hex);
        }
      },
      url: {
        enc: function(str) {
          return encodeURIComponent(str);
        },
        dec: function(str) {
          return decodeURIComponent(str);
        }
      }
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
      $scope.encoded = $scope.method.enc(newVal);
    });
    $scope.$watch('encoded', function(newVal) {
      if ($scope.decodedFocus) {
        return;
      }
      if (!newVal) {
        $scope.decoded = '';
        return;
      }
      $scope.decoded = $scope.method.dec(newVal);
    });
  }]);
