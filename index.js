const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
//-- Currently ONLY the pdf-generator works, really trying hard to get it to use a color trigger and import live data.
exports.datA = {
	title: "Coding Boot Camp",
	date: "1/10/2020",
	name: "Brad Johnston",
	age: 40,
	repositories: 13,
	stars: 4,
	following: 10,
	followers: 8,
	skills: "HTML CSS Mongo Express React Node Javascript",
	story: "Currently attending the UC Riverside Extension - Full Stack Coding Boot Camp."
}

inquirer
  .prompt({
    message: "Enter your GitHub username:",
    name: "username"
  })
  .then(function ({ username }) {
    const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

    axios.get(queryUrl).then(function (res) {
      const repoNames = res.data.map(function (repo) {
        return repo.name;
      });
      repos = repoNames.length;
      console.log(`Saved ${repoNames.length} repos`);
      //-------------------------


    })
  })
  .then(function query2() {

    var child_process = require('child_process');

    //EXECUTE query2.js
    child_process.exec('node query2.js', (error, stdout, stderr) => {
      console.log(`${stdout}`);
      console.log(`${stderr}`);
      if (error !== null) {
        console.log(`exec error: ${error}`);
      }
    })
  })

query2(200);