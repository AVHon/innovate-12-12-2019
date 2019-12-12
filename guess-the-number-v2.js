// fair random numbers between >= 0 and < 6 (0,1,2,3,4, or 5)
let mySecretNumber = Math.floor( Math.random() * 6) ;
let guesses = 0;

let makeAGuess = function(){
  guesses = guesses + 1;
  let guess = prompt( "Guess #" + guesses + ": what number am I thinking of?" );
  if ( guess == mySecretNumber ) {
    alert( "That's right! How did you know?" );
  } else {
    alert( "Banana. WRONG! Hahaha, sucker!" );
    makeAGuess();
  }
}

makeAGuess();
