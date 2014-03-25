angular.module('hashGenerator', [])
  .directive('hashTab', function() {
    return {
      scope: {},
      templateUrl: '/template/tabs/hash.html',
      replace: true,
      link: function(scope, elem, attr) {
        var hashMethod = function(hashName) {
          switch(hashName) {
            case 'md5':
              return CryptoJS.MD5;
            case 'sha1':
              return CryptoJS.SHA1;
            case 'sha256':
              return CryptoJS.SHA256;
            case 'sha512':
              return CryptoJS.SHA512;
          }
        };
        var reloadHashResult = function() {
          var method = hashMethod(scope.hashName);
          if (!method) {
            return;
          }
          scope.hashResult = scope.hashText ? method(scope.hashText).toString() : '';
        };
        scope.hashMethods = ['md5', 'sha1', 'sha256', 'sha512'];
        scope.hashName = scope.hashMethods[0];
        scope.$watch('hashText', function(newVal) {
          if (!hashMethod) {
            return;
          }
          reloadHashResult();
        });
        scope.$watch('hashName', function() {
          reloadHashResult();
        });
      }
    };
  });
