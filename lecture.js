const http = require('http');



var https = require('https');                               

https.get(equestOptions, function (response) {
  response.setEncoding('utf8');

  let rawData = '';
  
  response.on('data', function (data) {
    console.log('Chunk Received. Length:', data.length);
    rawData += data;
  });

  response.on('end', function(){
    callback(rawData);
  });

});
  


var requestOptions = {
  host: 'sytantris.github.io',
  path: '/http-examples/step1.html'
};

function printHTML (output) {
  const parseData = JSON.parse(rawData);
  console.log(Object.keys((parseData));
}
