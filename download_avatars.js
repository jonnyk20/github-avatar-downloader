var request = require('request');
var fs = require('fs');

function getRepoContributors(repoOwner, repoName, cb) {
  var contributors = [];
  request.get(requestURL, options,function(error, response, body){
    Promise.resolve(
    contributors = JSON.parse(body)).then(function(){
      contributors.forEach(function(person) {
        console.log(person.avatar_url);
      });
    })
  })               
  .on('error', function (err) {    
    console.log(err);                             
    throw err; 
  })
  // .on('end', function (res) {                          
  //   console.log('Finished');
  // })
  //.pipe(fs.createWriteStream('./downloaded.html'));         
}

var repoOwner = "jquery";
var repoName = "jquery";
var GITHUB_USER = "jonnyk20";
var GITHUB_TOKEN = "9bb52bcea1faeb39411c7e009a819febaadc9371";
var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

var options = {
  headers: {
    'User-Agent': "GitHub Avatar Downloader - Student Project"
  }
};

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});
