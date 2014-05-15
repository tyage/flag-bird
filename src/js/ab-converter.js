angular.module('abConverter', [])
  .service('abConverter', function() {
    return {
      ab2str: function(ab) {
        return UTF8.getStringFromBytes(new Uint8Array(ab));
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
