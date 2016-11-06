var fs = require('fs'),
    request = require('request');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', 'image/png');
    console.log('content-length:', '2000');

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

download('http://192.168.178.191:8080/video', 'google.jpg', function(){
  console.log('done');
});