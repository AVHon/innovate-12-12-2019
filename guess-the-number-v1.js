// fair random numbers between >= 0 and < 6 (0,1,2,3,4, or 5)
let mySecretNumber = Math.floor( Math.random() * 100) ;

let guess = prompt( "Guess the number I'm thinking of!" );

if ( guess == mySecretNumber ) {
  alert( "That's right! How did you know?" );
} else {
  alert( "Banana. WRONG! Hahaha, sucker!" );
  alert( "The right guess was " + mySecretNumber );
}
