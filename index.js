const inquirer = require('inquirer');

const fs = require('fs');

const { Triangle, Square, Circle } = require('./lib/shapes');

function writeToFile(fileName, answers) {
    let svgString = '';

    svgString =
        '<svg version="1.1" width="300" height="200" xmlns="http:www.w3.org/2000/svg">';
    svgString += '<g>';

    svgString += `${answers.shape}`;

    let shapeSelection;
    if (answers.shape === "Triangle") {
        shapeSelection = new Triangle(); 
            svgString += `<polygon points= "150, 18 244, 182 56, 182" fill="${answers.shapeBackgroundColor}"/>`;
        } else if (answers.shape === "Square") {
            shapeSelection = new Square();
            svgString += `<rect x"73" y="40" width="160" height="160" fill="${answers.shapeBackgroundColor}"/>`;
        } else {
            shapeSelection = new Circle();
            svgString += `<circle cx="150" cy="115" r="80" fill="${answers.shapeBackgroundColor}"/>`;
        }
        svgString += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>`;
        // Closing </g> tag
        svgString += "</g>";
        // Closing </svg> tag
        svgString += "</svg>";

        fs.writeFile(fileName, svgString, (err) => {
            err ? console.log(err) : console.log("log.svg has been Generated, please open the .svg file");
        });
    }

    function promptUser() {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "Please input the text you would like displayed! (Enter only up to 3 characters)",
                    name: "text",
                },
                {
                    type: "input",
                    message: "What color would you like the background of your shape to be? (Enter color keyword or a hexadecimal number)",
                    name: "textColor",
                },
                {
                    type: "list",
                    message: "What shape would you like your logo to be?",
                    choices: ["Triange", "Square", "Circle"],
                    name: "shape",
                },
                {
                    type: "input",
                    message: "Please choose your background color (Enter color keyword or a hexedecimal number)",
                    name: "shapeBackgroundColor",
                },
            ])
            .then((answers) => {
                if (answers.text.length > 3) {
                    console.log("The input can only be up to 3 characters");
                    promptUser();
                } else {
                    writeFile("logo.svg", answers);
                }
            });
    }






promptUser();