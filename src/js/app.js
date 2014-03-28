var app = angular.module('flagBird', ['ngRoute', 'hashTab', 'encDecTab'])
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
      .otherwise({
        path: '/'
      });
  }])
  .controller('MainCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.$on('$locationChangeStart', function(newVal) {
      $scope.currentPath = $location.path();
    });
  }]);
