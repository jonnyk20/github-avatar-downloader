var request = require('request');
var fs = require('fs');
var dotenv = require('dotenv');
dotenv.config({path: './.env'});

const GITHUB_USER = process.env.DB_USER;
const GITHUB_TOKEN = process.env.DB_PASS;
var options = {
  headers: {
    'User-Agent': "GitHub Avatar Downloader - Student Project"
  }
};

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  if (!repoOwner || !repoName) {
    console.log("Please enter repo name and owner");
    return;
  }
  var contributors = [];
  request.get(requestURL, options, cb)               
  .on('error', function (err) {                              
    throw err;
  })      
}

function listAvatarUrls(error, response, body){
  contributors = JSON.parse(body);
  contributors.forEach(function(person) {
    downloadImageByURL(person.avatar_url, "./avatars/" + person.login + ".jpg" );
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url, options,function(){
  })
  .pipe(fs.createWriteStream(filePath))
  .on('error', function (err) {
    throw err;
  });
}




getRepoContributors(process.argv[2], process.argv[3], listAvatarUrls);

/*
  if (!fs.existsSync(filePath)){
    fs.mkdirSync(filePath);
  }


*/