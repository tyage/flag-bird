angular.module('networkTab', [])
  .controller('NetworkCtrl', ['$scope', function($scope) {
    $scope.requests = [];
    chrome.devtools.network.onRequestFinished.addListener(function(request) {
      $scope.requests.push(request);
      $scope.$apply();
      request.getContent(function(content, encoding) {
        request.response.content.content = content;
        request.response.content.encoding = encoding;
        $scope.$apply();
      });
    });
  }]);
