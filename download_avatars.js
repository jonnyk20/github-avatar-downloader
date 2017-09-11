var request = require('request');
var fs = require('fs');

function getRepoContributors(repoOwner, repoName, cb) {
  var contributors = [];
  request.get(requestURL, options,function(error, response, body){
    Promise.resolve(
    contributors = JSON.parse(body)).then(function(){
      contributors.forEach(function(person) {
        // console.log("Login:",person.login);
        // console.log("Avatar:",person.avatar_url);
        downloadImageByURL(person.avatar_url, "./avatars/" + person.login + ".jpg" );
      });
    })
  })               
  .on('error', function (err) {    
    console.log(err);                             
    throw err; 
  })      
}


function downloadImageByURL(url, filePath) {
  request.get(url, options,function(error, response, body){
  })
  .pipe(fs.createWriteStream(filePath))
  .on('error', function (err) {    
    console.log(err);                             
    throw err; 
  })     ;            
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

// downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")