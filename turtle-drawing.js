let lary = new Turtle();
let white = lary.makeColor(255,255,255);
let blue = lary.makeColor(0,135,255);
let red = lary.makeColor(255,0,0);
let mauve = lary.makeColor(224,176,255);
let yellow = lary.makeColor(240,240,0);

let drawSides = function( angle, sides, length ){
  if ( sides == 0 ){ return; }
  lary.move( length ) ;
  lary.turn( angle ) ;
  drawSides( angle, sides - 1, length );
}

let polygon = function(sides, length){
  let angle = 360 / sides; 
  drawSides( angle, sides, length );
}

lary.setColor(red);
polygon(8, 10); // small octagon
lary.turn( -90 );
lary.move( 40 );
lary.setColor(white);
polygon(4, 60); // medium square
lary.turn( 90 );
lary.setColor(blue);
polygon(3, 40);

// move to the top-right
lary.penUp();
lary.turn(45);
lary.move(100);
lary.penDown();

// 5-point star
lary.setColor(mauve);
lary.move(80);
lary.turn(144);
lary.move(80);
lary.turn(144);
lary.move(80);
lary.turn(144);
lary.move(80);
lary.turn(144);
lary.move(80);
lary.turn(144);

// go to the top-left
lary.penUp();
lary.turn(100);
lary.move(200);
lary.turn(-145);
lary.penDown();

// cube-like shape
lary.setColor(white);
lary.turn(-30);
lary.move(40);
lary.turn(-60);
lary.move(40);
lary.turn(120);
polygon(6,40);
lary.turn(60);
lary.move(40);
lary.turn(-60);
lary.move(40);

lary.move(-40);
lary.penUp();
lary.turn(60);
lary.move(20);
lary.setColor(red);
lary.pour();
lary.move(-20);
lary.turn(120);
lary.move(20);
lary.setColor(blue);
lary.pour();
lary.move(-20);
lary.turn(120);
lary.move(20);
lary.setColor(yellow);
lary.pour();


lary.show();
