/*eslint-disable*/
var request = require('request');
var fs = require('fs');
var dotenv = require('dotenv');
dotenv.config({path: './.env'});

// define Necessary variables

const username = process.env.GITHUB_USERNAME;
const token = process.env.GITHUB_TOKEN;
var options = {
  headers: {
    'User-Agent': "GitHub Avatar Downloader - Student Project"
  }
};
var path =  "./avatars/";

// list username and avatar usrls of contributors
function listAvatarUrls(error, response, body){
 // Check for asynchronous errors
  switch(true) {
    case (response.statusCode == 404):
      console.log ("Repo or user not found")
      return;
    case (response.statusCode == 401):
      console.log ("Bad Credentials")
      return;
  }
  var contributors = JSON.parse(body);
  contributors.forEach(function(person) {
    // downloadImageByURL(person.avatar_url, path + person.login + ".jpg" );
    console.log(person);
  });
}

// download images
function downloadImageByURL(url, filePath) {
  request.get(url)
    .pipe(fs.createWriteStream(filePath))
}

// get repo lsit of repo conntributors and use callback
function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ username + ':' + token + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console
  // checks for synchronous errors
  switch(true) {
    case (!fs.existsSync("./.env")):
      console.log("Please create ./.env file with credentials");
      return;
    case (!username || !token ): 
      console.log("Missing username or Token in .env file");
      return;
    case (process.argv.length < 4 || process.argv.length < 4): 
      console.log("Please enter the right number of arguemnts (2): <repo-owner> <repo-name>");
      return;
    case (!fs.existsSync(path)):
      fs.mkdirSync(path);
      console.log("/avatars/ not found so it was created");
  }
  request.get(requestURL, options, cb)               
    .on('error', function (err) {                              
      throw err;
    })      
}

getRepoContributors(process.argv[2], process.argv[3], listAvatarUrls);

var path2 = "./.env";
function checkPath(path2){
  if (fs.existsSync(path2)) {
  console.log("exists");
    } else {
      console.log("Does not exists");
  }
}