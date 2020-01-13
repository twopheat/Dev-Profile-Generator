const axios = require("axios");
const inquirer = require("inquirer");
const pdfGen = require('./pdf-generator.js')

/*const data = {
  title: "Coding Boot Camp",
  date: "1/10/2020",
  name: "Brad Johnston",
  age: 40,
  repositories: 13,
  stars: 4,
  following: 10,
  followers: 8,
  skills: "HTML CSS Javascript Mongo Expres.datas React Node",
  story: "Currently attending the UC Riverside Extension - Full Stack Coding Boot Camp."
}*/
inquirer
  .prompt([{
    message: "Enter Your GitHub Username:",
    name: "username"
  },
  {
    message: "Pick a Materialize Color:",
    name: "color"
  }])
  .then(function ({ username, color }) {
    let data = { color: color }
    const queryUrl = `https://api.github.com/users/${username}`;

    axios.get(queryUrl).then(function (res) {
      data["stars"] = res.data.starred_url.split("{")[0];
      data["followers"] = res.data.followers;
      data["following"] = res.data.following;
      data["repositories"] = res.data.public_repos;
      data["followers"] = res.data.followers;
      data["location"] = res.data.location;
      data["name"] = res.data.name;
      data["bio"] = res.data.bio;


      stars(data);
      console.log(data);
    });



  });

async function stars(data) {
  axios.get(data.stars).then(function (res) {
    data.stars = res.data.length;
    pdfGen(data);
  })
};






