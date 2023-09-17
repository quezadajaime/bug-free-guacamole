//imports inquiere node
const inquirer = require('inquirer');

//import for file system module
const fs = require('fs');

//importing shapes from .lib directory
const { Triangle, Square, Circle } = require('./lib/shapes');

//function to write the SVG file based on users inputs
function writeToFile(fileName, answers) {
    //starting as an empty string
    let svgString = '';
    //sets the width and height of the logo
    svgString =
        '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
    //wraps the <text> tag
    svgString += '<g>';
    //takes the users shape input to insert it into the SVG file
    svgString += `${answers.shape}`;

    //Statements to check the users inputs from the choices array and then adds properties and shape color to the SVG string.
    let shapeSelection;
    if (answers.shape === "Triangle") {
        shapeSelection = new Triangle();

        svgString += `<polygon points= "150, 18 244, 182 56, 182" fill="${answers.shapeBackgroundColor}"/>`;
    } else if (answers.shape === "Square") {
        shapeSelection = new Square();
        svgString += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeBackgroundColor}"/>`;
    } else {
        shapeSelection = new Circle();
        svgString += `<circle cx="150" cy="115" r="80" fill="${answers.shapeBackgroundColor}"/>`;
    }
    //sets the text alignment and font 
    svgString += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>`;
    // Closing </g> tag
    svgString += "</g>";
    // Closing </svg> tag
    svgString += "</svg>";
    //generates the SVG file and prompts the user it has been generated.
    fs.writeFile(fileName, svgString, (err) => {
        err ? console.log(err) : console.log("log.svg has been Generated, please open the logo.svg file");
    });
}
// prompts for the user to answer to create their logo
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
                message: "What color would you like the text to be? (Enter color keyword or a hexadecimal number)",
                name: "textColor",
            },
            {
                type: "list",
                message: "What shape would you like your logo to be?",
                choices: ["Triangle", "Square", "Circle"],
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
                writeToFile("logo.svg", answers);
            }
        });
}

//Calls promptUser function to ask the inquirer questions.
promptUser();