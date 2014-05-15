angular.module('abConverter', [])
  .service('abConverter', function() {
    return {
      ab2str: function(ab) {
        var str;
        var uint8Array = new Uint8Array(ab);
        try {
          str = UTF8.getStringFromBytes(uint8Array);
        } catch (e) {
          str = String.fromCharCode.apply(null, uint8Array);
        }
        return str;
      },
      str2ab: function(str) {
        var stringArray = UTF8.setBytesFromString(str);
        var buf = new ArrayBuffer(stringArray.length);
        var bufView = new Uint8Array(buf);
        bufView.set(stringArray);
        return buf;
      }
    };
  });
