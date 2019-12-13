/* jshint moz: true */  // Incantation to make jsbin not complain about "let".
// This javascript expects something like `turtle.html` in your HTML.
let turtle = new Turtle();

let drawShip = function(ship){
  turtle.jumpTo(ship.x, ship.y); // Go to where the ship is.
  turtle.setColor(ship.color); // use the ship's color
  // Go from the center of the ship to its edge, and draw the outline.
  turtle.penUp();
  turtle.move(-3);
  turtle.penDown();
  turtle.turn(120);
  turtle.move(8);
  turtle.turn(-140);
  turtle.move(20);
  turtle.turn(-140);
  turtle.move(20);
  turtle.turn(-140);
  turtle.move(8);
  turtle.turn(-60);
  // That's it -- the outline of the ship has been drawn!
  // Go back to the middle of the ship.
  turtle.jumpTo(ship.x, ship.y);
  turtle.pour(); // Color the inside of the ship.
  // Make a white mark to show the center of the ship.
  turtle.setColor(turtle.makeColor(255,255,255));
  turtle.tapPen();
}

let ship = {x: 20, y: 20, color: turtle.makeColor(60,197,24)};

  turtle.setColor(turtle.makeColor(0,0,0));
  turtle.clear(); // Fill the window with black.

  drawShip(ship);
  
  turtle.show(); // Put pixels on the screen -- must be last!

