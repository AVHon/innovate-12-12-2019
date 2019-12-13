/* jshint moz: true */  // Incantation to make jsbin not complain about "let".
// This javascript expects something like `turtle.html` in your HTML.
let desiredFrameRate = 15; // frames per second
let desiredDelay = 1000 / desiredFrameRate;
let lastFrameTime = 0;

let turtle = new Turtle();

let moveThing = function(thing){
  thing.angle += thing.turnSpeed;
}

let drawShip = function(ship){
  turtle.jumpTo(ship.x, ship.y); // Go to where the ship is.
  turtle.turnTo(ship.angle); // Face the way the ship is facing.
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

let ship = {x: 20, y: 20, color: turtle.makeColor(60,197,24),
            angle: 0, turnSpeed: 0};

// Things that happen when "a key is pressed down" go here.
document.addEventListener("keydown", function(keyEvent){
  console.log(keyEvent.key); // Print the name of the pressed key.
  if(keyEvent.key == "a"){ship.turnSpeed = 5;} // Turn counterclockwise with "a"
  else if(keyEvent.key == "d"){ship.turnSpeed = -5;} // Turn clockwise with "d".
});

document.addEventListener("keyup", function(keyEvent){
  if(keyEvent.key == "a"){ship.turnSpeed = 0;}
  else if(keyEvent.key == "d"){ship.turnSpeed = 0;}
});

let gameFrame = function(now) {
  window.requestAnimationFrame(gameFrame); // Draw another frame after this one.
  if(now < lastFrameTime + desiredDelay){return;} // Keep the frame rate low.
  lastFrameTime = now;
  
  turtle.setColor(turtle.makeColor(0,0,0));
  turtle.clear(); // Fill the window with black.
  moveThing(ship);
  drawShip(ship);
  turtle.show(); // Put pixels on the screen -- must be last!
};
window.requestAnimationFrame(gameFrame); // Make the first frame be drawn.

