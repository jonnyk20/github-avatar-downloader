var request = require('request');

function getRepoContributors(repoOwner, repoName, cb) {
  // ...
}

var repoOwner = "jquery";
var repoName = "jquery";
var GITHUB_USER = "jonnyk20";
var GITHUB_TOKEN = "9bb52bcea1faeb39411c7e009a819febaadc9371";
var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

console.log(requestURL);