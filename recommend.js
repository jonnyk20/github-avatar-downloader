var request = require('request');
var fs = require('fs');
var dotenv = require('dotenv');
dotenv.config({path: './.env'});

// define necessary variables
const username = process.env.GITHUB_USERNAME;
const token = process.env.GITHUB_TOKEN;
var options = {
  headers: {
    'User-Agent': "GitHub Avatar Downloader - Student Project"
  }
};
var path =  "./avatars/";

// output variable
var repoCount = {};

// list username and avatar usrls of contributors
function listContributors(error, response, body){
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

  // create array of which resolves when a contributor's stars have been counted
  const allPromises = contributors.map(function(person, contributorIndex) {
    var myPromise = new Promise(function(resolve, reject){
      var url = 'https://' + username + ':' + token + '@api.github.com/users/' + person.login + "/starred"
      listStarred(url, person.login, function(){
        resolve();
      });
    })
    return myPromise;
  });
 // When all star counting promises have returned, return..
 // encompassing promise, and count stars to find the most popular repo
  Promise.all(allPromises).then(function(){
    var sorted = Object.keys(repoCount).sort(function(a, b){
      return  repoCount[b].count - repoCount[a].count;
    }).slice(0, 6);
    sorted.forEach(function(repo){
      console.log(`[${repoCount[repo].count} stars] ${repoCount[repo].name} / ${repoCount[repo].owner}`);
    });

  })
}

// count starts that a particular contributor has given
function listStarred(url, name, cb){
  request.get(url, options, function(err, res, body){
    var starred = JSON.parse(body);
    starred.forEach(function(starredRepo){
      if (!repoCount[starredRepo.id]){
        repoCount[starredRepo.id] = {
          count: 1,
          name: starredRepo.name,
          owner: starredRepo.owner.login
        };
      } else {
        repoCount[starredRepo.id].count++;
      }
    });
    cb();
  })
}

// get repo lsit of repo contributors and use callback
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

getRepoContributors(process.argv[2], process.argv[3], listContributors);

