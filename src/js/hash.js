angular.module('hashTab', [])
  .controller('HashCtrl', ['$scope', function($scope) {
    $scope.hashMethods = {
      md5: CryptoJS.MD5,
      sha1: CryptoJS.SHA1,
      sha256: CryptoJS.SHA256,
      sha512: CryptoJS.SHA512
    };
    $scope.hashMethod = $scope.hashMethods.md5;
  }]);
