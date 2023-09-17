
const { describe } = require("node:test");
const {Triangle, Square, Circle} = require("./shapes.js");

//Test to run Triangle test with black background
describe("Triangle test", () => {
    test("test for a triangle with black background", () => {
        const shape = new Triangle();
        shape.setColor("black");
        expect(shape.render()).toEqual(
            '<polygon points="150, 18 244, 182 56, 182" fill="black" />'
        );
    });
});

//Test to run square shape with yellow background
describe("Square test", () => {
    test("test for a square with a yellow background", () => {
      const shape = new Square();
      shape.setColor("yellow");
      expect(shape.render()).toEqual(
        '<rect x="73" y="40" width="160" height="160" fill="yellow" />'
      );
    });
  });
  
//Test to run circle test with red background
  describe("Circle test", () => {
    test("test for a circle with a red background", () => {
      const shape = new Circle();
      shape.setColor("red");
      expect(shape.render()).toEqual(
        '<circle cx="150" cy="115" r="80" fill="red" />'
      );
    });
  });