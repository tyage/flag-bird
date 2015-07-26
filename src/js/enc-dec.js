angular.module('encDecTab', ['crlf'])
  .service('caesar', function() {
    // a-z and A-Z
    var alphabets = [
      ['a'.charCodeAt(0), 'z'.charCodeAt(0)],
      ['A'.charCodeAt(0), 'Z'.charCodeAt(0)]
    ];
    this.rot = function(str, rotNum) {
      rotNum = parseInt(rotNum);
      if (isNaN(rotNum)) {
        return str;
      }
      var output = '';
      for (var i=0,l=str.length;i<l;++i) {
        var char = str[i];
        if ((/[a-z]/i).test(char)) {
          var charCode = char.charCodeAt(0);
          for (var j=0,m=alphabets.length;j<m;++j) {
            var charCodes = alphabets[j];
            var alphabetLength = charCodes[1] - charCodes[0] + 1;
            rotNum = rotNum % alphabetLength;
            rotNum = rotNum < 0 ? rotNum + alphabetLength : rotNum;
            if (charCodes[0] <= charCode && charCode <= charCodes[1]) {
              var charCodeDiff = (charCode - charCodes[0] + rotNum) % alphabetLength;
              char = String.fromCharCode(charCodeDiff + charCodes[0]);
              break;
            }
          }
        }
        output += char;
      }
      return output;
    };
  })
  .service('entity', function() {
    this.encMethod = {
      decimal: function (charCode) {
        return '&#' + charCode.toString(10) + ';';
      },
      hex: function (charCode) {
        return '&#x' + charCode.toString(16) + ';';
      },
      // ToDo
      string: function (charCode) {
      }
    };
    this.decMethod = {
      decimal: function (str) {
        var charCode = str.slice(2, -1);
        return String.fromCharCode(charCode);
      },
      hex: function (str) {
        if (str[2] !== 'x') {
          return str;
        }
        var charCode = str.slice(3, -1);
        return String.fromCharCode(parseInt(charCode, 16));
      },
      // ToDo
      string: function (str) {
      }
    };
    this.enc = function (str, base) {
      var output = '';
      for (var i=0,l=str.length;i<l;++i) {
        output += this.encMethod[base](str.charCodeAt(i));
      }
      return output;
    };
    this.dec = function (str, base) {
      var output = str.replace(/&#?[a-zA-Z0-9]+;/g, this.decMethod[base]);
      return output;
    };
  })
  .controller('EncDecCtrl', ['$scope', 'caesar', 'entity', 'crlf', function($scope, caesar, entity, crlf) {
    var cryptoJsEnc = function(str, method) {
      var utf8Str = CryptoJS.enc.Utf8.parse(str);
      return utf8Str.toString(method);
    };
    var cryptoJsDec = function(str, method) {
      var decodedStr = method.parse(str);
      try {
        return decodedStr.toString(CryptoJS.enc.Utf8);
      } catch (e) {
        return null;
      }
    };
    var removeBreaks = function(str) {
      return str.replace(/\n|\r/g, "");
    };
    $scope.encodedFocus = false;
    $scope.decodedFocus = false;
    $scope.caesarRot = 13;
    $scope.entityBase = 'decimal';
    $scope.methods = {
      base64: {
        enc: function(str) {
          return cryptoJsEnc(str, CryptoJS.enc.Base64);
        },
        dec: function(str) {
          return cryptoJsDec(removeBreaks(str), CryptoJS.enc.Base64);
        },
      },
      hex: {
        enc: function(str) {
          return cryptoJsEnc(str, CryptoJS.enc.Hex);
        },
        dec: function(str) {
          return cryptoJsDec(removeBreaks(str), CryptoJS.enc.Hex);
        }
      },
      url: {
        enc: function(str) {
          return encodeURIComponent(str);
        },
        dec: function(str) {
          return decodeURIComponent(str);
        }
      },
      caesar: {
        enc: function(str) {
          return caesar.rot(str, $scope.caesarRot);
        },
        dec: function(str) {
          return caesar.rot(str, -$scope.caesarRot);
        }
      },
      entity: {
        enc: function(str) {
          return entity.enc(str, $scope.entityBase);
        },
        dec: function(str) {
          return entity.dec(str, $scope.entityBase);
        }
      }
    };
    $scope.method = $scope.methods.base64;
    $scope.$watch('decoded', function(newVal) {
      if ($scope.encodedFocus) {
        return;
      }
      if (!newVal) {
        $scope.encoded = '';
        return;
      }
      $scope.encoded = $scope.method.enc(newVal);
    });
    $scope.$watch('encoded', function(newVal) {
      if ($scope.decodedFocus) {
        return;
      }
      if (!newVal) {
        $scope.decoded = '';
        return;
      }
      $scope.decoded = $scope.method.dec(newVal);
    });
    $scope.$watch('caesarRot', function() {
      $scope.encoded = $scope.method.enc($scope.decoded);
    });
    $scope.$watch('entityBase', function() {
      $scope.encoded = $scope.method.enc($scope.decoded);
    });
    $scope.$watch('method', function() {
      $scope.encoded = $scope.method.enc($scope.decoded);
    });
    $scope.$watch('useCrlf', function() {
      $scope.encoded = $scope.method.enc($scope.useCrlf ? crlf.toCrlf($scope.decoded) : $scope.decoded);
    });
}]);
