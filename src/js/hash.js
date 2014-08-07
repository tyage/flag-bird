angular.module('hashTab', ['crlf'])
  .controller('HashCtrl', ['$scope', 'crlf', function($scope, crlf) {
    $scope.hashMethods = {
      length: function(str) {
        return str ? str.length : 0;
      },
      md5: CryptoJS.MD5,
      sha1: CryptoJS.SHA1,
      sha256: CryptoJS.SHA256,
      sha512: CryptoJS.SHA512
    };
    $scope.crlf = function(data) {
      return $scope.useCrlf ? crlf.toCrlf(data) : data;
    }
  }]);
