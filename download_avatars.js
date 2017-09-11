var request = require('request');
var fs = require('fs');
var dotenv = require('dotenv');
dotenv.config({path: './credentials.env'});

const GITHUB_USER = process.env.DB_USER;
const GITHUB_TOKEN = process.env.DB_PASS;

function getRepoContributors(repoOwner, repoName, cb) {
var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  if (!repoOwner || !repoName) {
    console.log("Please enter repo name and owner");
    return;
  }

  var contributors = [];
  request.get(requestURL, options,function(error, response, body){
    Promise.resolve( // <- Is this necessary?
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
  });            
}





var options = {
  headers: {
    'User-Agent': "GitHub Avatar Downloader - Student Project"
  }
};

getRepoContributors(process.argv[2], process.argv[3], function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

// downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")