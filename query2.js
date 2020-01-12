
const inquirer = require("inquirer");
var color = color;
inquirer
    .prompt({
        message: "Enter your Favorite Color:",
        name: "color"
    })
    .then(function (e) {

        var child_process = require('child_process');
    
            //EXECUTE pdf-generator.js
            child_process.exec('node pdf-generator.js', (error, stdout, stderr) => {
                console.log(`${stdout}`);
                console.log(`${stderr}`);
                if (error !== null) {
                    console.log(`exec error: ${error}`);
                }
            });
        
    });
    