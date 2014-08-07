var app = angular.module('flagBird', ['ngRoute', 'hashTab', 'encDecTab', 'networkTab'])
  .controller('MainCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.templateUrls = {
      home: '/template/tabs/home.html',
      hash: '/template/tabs/hash.html',
      encDec: '/template/tabs/enc-dec.html',
      network: '/template/tabs/network.html',
      hexEditor: '/template/tabs/hex-editor.html'
    };
    $scope.$on('$locationChangeStart', function(newVal) {
      $scope.currentPath = $location.path();
    });
  }]);
