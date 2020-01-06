
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const express = require("express");
const bodyParser = require("body-parser");
const path = resuire('path');

const port = 5000;


const app = express()

inquirer
  .prompt({
    message: "Enter your GitHub username:",
    message: "Enter your favorite color",
    name: "username"
  })
  .then(function({ username }) {
    const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

    axios.get(queryUrl).then(function(res) {
      const repoNames = res.data.map(function(repo) {
        return repo.name;
      });

      const repoNamesStr = repoNames.join("\n");

      fs.writeFile("repos.pdf", repoNamesStr, "binary", function(err) {
        if (err) {
          throw err;
        }

        console.log(`Saved ${repoNames.length} repos`);
      });
    });
  });