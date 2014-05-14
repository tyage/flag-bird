angular.module('abConverter', [])
  .service('abConverter', function() {
    return {
      ab2str: function(ab) {
        return UTF8.getStringFromBytes(new Uint8Array(ab));
      },
      str2ab: function(str) {
        var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
        var bufView = new Uint8Array(buf);
        UTF8.setBytesFromString(str, bufView);
        return buf;
      }
    };
  });
