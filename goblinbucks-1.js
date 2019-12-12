let $output = $('#output');
let $input = $('#input');
let $submit = $('#submit');

let welcomePrompt = "You are an adventurer who has just rolled out of bed. Tired and thirsty, you maraud the town square looking for something to perk up."
    + "\n\n" 
    + "Suddenly, you notice a shop you have never seen before."
    + "\n\n"  
    + "You walk into the ramshackle hut marked only by a wooden sign in disrepair. GOBLINBUCKS, it reads. "
    + "\n\n"  
    + "Inside, a short green humanoid is snoring. You wake him up with a small cough, and he snorts in surprise as he approaches the obviously broken cash register."
    + "\n\n"  
    + "He says, \"Welcome to GoblinBucks, the only coffee shop run by goblins. 'Because one is more than enough!' May I take your order?\""
    + "\n\n"  
    + "Your options are:\n"
    + "1. Mud Coffee\n"
    + "2. Slop Tea\n"
    + "3. Delightful Crystal Latte"
    + "\n\n"  
    + "Enter 1, 2, or 3.";

$output.text(welcomePrompt);

$submit.click(function() {
    let optionNumber = $input.val();
    let oldOutput = $output.text();
    $input.val("");

    let newOutput = "\n\n---\n\n"
        + "You entered: " + optionNumber
        + "\n\n---\n\n";

    if (optionNumber == 1) {
        newOutput += "The goblin smirks and grabs a cup from the shelf. "
            + "\n\n"  
            + "He pours a bucket of hot water into a shallow depression in the dirt floor. "
            + "\n\n"  
            + "He mixes the dirt and water with a grimy stick, then scoops a hearty portion of mud into the cup."
            + "\n\n"  
            + "He drops in a cube of sugar. \"Enjoy!\" he says."
            + "\n\n"  
            + "Not wanting to be rude, you gulp down a mouthful, and it tastes like dirt and water."
            + "\n\n"  
            + "You now understand why there is only one GoblinBucks."
            + "\n\n"  
            + "Thank you for playing!";

        $submit.off('click');
    } else if (optionNumber == 2) {
        newOutput += "The goblin reaches into a dubious bucket marked ZLOP."
            + "\n\n"  
            + "He extracts a fistful of wriggling worms and dirt and what might be a fish skeleton."
            + "\n\n"  
            + "Nodding in satisfaction, he chucks it into a tea kettle and pours some cold water in before passing it to you. \"Order up!\" he says."
            + "You reluctantly grab a straw and take a cautious sip. It tastes worse than a public restroom smells."
            + "\n\n"  
            + "You now understand why there is only one GoblinBucks."
            + "\n\n"  
            + "Thank you for playing!";
            
        $submit.off('click');
    } else if (optionNumber == 3) {
        newOutput += "The goblin snorts and says, \"You kidding me? We don't really have delightful crystal lattes. That was a joke. Order something else.\"";
    } else {
        newOutput += "\n\n"
            + "Please enter 1, 2, or 3."
            + "\n\n";
    }

    $output.text(oldOutput + newOutput);
});
