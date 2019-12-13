/* jshint moz: true */  // Incantation to make jsbin not complain about "let".
// This javascript expects something like `turtle.html` in your HTML.
let desiredFrameRate = 15; // frames per second
let desiredDelay = 1000 / desiredFrameRate;
let lastFrameTime = 0;

let turtle = new Turtle();

let moveThing = function(thing){
  // If the thing has an engine that's firing, change its speed.
  if(thing.throttle > 0){
    // Use trigonometry to calculate how hard the engine pushes ↔ and ↕.
    thing.xSpeed += thing.throttle*Math.cos(thing.angle*Math.PI/180);
    thing.ySpeed -= thing.throttle*Math.sin(thing.angle*Math.PI/180);
  }
  thing.x += thing.xSpeed;
  thing.y += thing.ySpeed;
  thing.angle += thing.turnSpeed;
  // Keep the thing inside the screen (the turtle's canvas).
  if(thing.x < 0)                    {thing.x += turtle.canvas.width;}
  if(thing.x >= turtle.canvas.width) {thing.x -= turtle.canvas.width;}
  if(thing.y < 0)                    {thing.y += turtle.canvas.height;}
  if(thing.y >= turtle.canvas.height){thing.y -= turtle.canvas.height;}
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
  // Draw the engine flame if the engine is firing.
  if(ship.throttle > 0){
    turtle.turnTo(ship.angle + 180); // Face the back of the ship.
    turtle.penUp();
    turtle.move(4); // Go to the back of the ship.
    turtle.setColor(turtle.makeColor(255, 0, 0));
    turtle.penDown();
    turtle.turn(Math.random()*20 - 10); // Flame angle wavers.
    turtle.move(1 + Math.random()*ship.throttle*32); // Flame length wavers.
  }
}

let ship = {x: 20, y: 20, color: turtle.makeColor(60,197,24),
            angle: 0, turnSpeed: 0,
            xSpeed: 0, ySpeed: 0, throttle: 0,
            firing: false};
 
let missiles = []; // At the start of the game, there are no missiles.

let fireMissile = function(ship){
  let MS = 4; // "Missile Speed"
  turtle.jumpTo(ship.x, ship.y);
  turtle.turnTo(ship.angle);
  turtle.penUp();
  turtle.move(9); // Go to the front of the ship (so it doesn't shoot itself).
  let missile = {x: turtle.getX(), y: turtle.getY(),
                 age: 0, exploded: false,
                 xSpeed: ship.xSpeed + Math.cos(ship.angle*Math.PI/180)*MS,
                 ySpeed: ship.ySpeed - Math.sin(ship.angle*Math.PI/180)*MS};
  missiles.push(missile); // Add the missile to the list of all missiles.
} 

let checkMissileExplosion = function(missile){
  missile.age += 1;
  // Missiles explode if they hit the ship or get too old.
  turtle.jumpTo(missile.x, missile.y);
  if(turtle.colorsEqual(turtle.getCanvasColor(), ship.color)){missile.exploded = true;}
  let missileLifetime = 10*desiredFrameRate; // 10 seconds, converted to frames
  if(missile.age > missileLifetime){missile.exploded = true;}
}

let missileIsActive = function(missile){
  return missile.exploded == false;
}

let drawMissile = function(missile){
  turtle.jumpTo(missile.x, missile.y);
  if(missile.exploded){ // Explosions look like concontric circles.
    turtle.setColor(turtle.makeColor(255, 0, 0));
    turtle.circle(4);
    turtle.setColor(turtle.makeColor(128, 0, 0));
    turtle.circle(8);
    turtle.setColor(turtle.makeColor(64, 0, 0));
    turtle.circle(12);
  } else { // Missiles look like a large dot.
    turtle.setColor(turtle.makeColor(255, 0, 0));
    turtle.tapPen();
    turtle.circle(1);
  }
}

let stars = []; // Start with no stars.
let addStars = function(n){
  if(n<=0){return;}
  stars.push({x: Math.random()*turtle.canvas.width,
              y: Math.random()*turtle.canvas.height});
  addStars(n-1);
}
addStars(100); // Make 100 random stars at the start of the game.

let drawStar = function(star){
  turtle.jumpTo(star.x, star.y);
  // Don't draw stars where the ship is. (only works if ship is already drawn)
  if(turtle.colorsEqual(turtle.getCanvasColor(), ship.color)){return;}
  turtle.setColor(turtle.makeColor(255,255,255));
  turtle.tapPen();
}

// Things that happen when "a key is pressed down" go here.
document.addEventListener("keydown", function(keyEvent){
  console.log(keyEvent.key); // Print the name of the pressed key.
  if(keyEvent.key == "a"){ship.turnSpeed = 5;} // Turn counterclockwise with "a"
  else if(keyEvent.key == "d"){ship.turnSpeed = -5;} // Turn clockwise with "d".
  else if(keyEvent.key == "s"){ship.throttle = 0.5;} // Fire the engine with "s"
  else if(keyEvent.key == "w"){ship.firing = true;} // Fire missiles with "w".
});

document.addEventListener("keyup", function(keyEvent){
  if(keyEvent.key == "a"){ship.turnSpeed = 0;}
  else if(keyEvent.key == "d"){ship.turnSpeed = 0;}
  else if(keyEvent.key == "s"){ship.throttle = 0;}
  else if(keyEvent.key == "w"){ship.firing = false;}
});

let gameFrame = function(now) {
  window.requestAnimationFrame(gameFrame); // Draw another frame after this one.
  if(now < lastFrameTime + desiredDelay){return;} // Keep the frame rate low.
  lastFrameTime = now;
  
  turtle.setColor(turtle.makeColor(0,0,0));
  turtle.clear(); // Fill the window with black.
  if(ship.firing){fireMissile(ship);}
  moveThing(ship);
  missiles.forEach(moveThing);
  drawShip(ship);
  stars.forEach(drawStar);
  missiles.forEach(checkMissileExplosion);  // Make missiles explode.
  missiles.forEach(drawMissile);
  missiles = missiles.filter(missileIsActive);
  turtle.show(); // Put pixels on the screen -- must be last!
};
window.requestAnimationFrame(gameFrame); // Make the first frame be drawn.

