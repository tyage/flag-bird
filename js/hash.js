angular.module('hashGenerator', [])
  .directive('hashTab', function() {
    return {
      scope: {},
      templateUrl: '/template/tabs/hash.html',
      replace: true,
      link: function(scope, elem, attr) {
        scope.$watch('md5Text', function(newVal) {
          scope.md5Hash = newVal && newVal !== '' ?
            CryptoJS.MD5(newVal) + '' : '';
        });
      }
    };
  });
