var app = angular.module('flagBird', ['ngRoute', 'hashTab', 'encDecTab', 'networkTab'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/template/tabs/home.html'
      })
      .when('/hash', {
        templateUrl: '/template/tabs/hash.html',
        controller: 'HashCtrl'
      })
      .when('/enc-dec', {
        templateUrl: '/template/tabs/enc-dec.html',
        controller: 'EncDecCtrl'
      })
      .when('/network', {
        templateUrl: '/template/tabs/network.html',
        controller: 'NetworkCtrl'
      })
      .otherwise({
        path: '/'
      });
  }])
  .controller('MainCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.$on('$locationChangeStart', function(newVal) {
      $scope.currentPath = $location.path();
    });
  }]);
