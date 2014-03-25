var app = angular.module('flagBird', ['ngRoute', 'hashTab'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/hash', {
        templateUrl: '/template/tabs/hash.html',
        controller: 'HashCtrl'
      })
      .when('/', {
        templateUrl: '/template/tabs/home.html'
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
