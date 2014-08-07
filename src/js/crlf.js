angular.module('crlf', [])
  .service('crlf', function() {
    return {
      toCrlf: function(data) {
        return data.replace(/\r\n/g, '\n').replace(/\r/g, '\n').replace(/\n/g, '\r\n');
      }
    };
  });
