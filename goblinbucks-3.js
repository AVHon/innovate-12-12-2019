let $output = $('#output');
let $input = $('#input');

let dirty_cup = {
    name: 'Dirty Cup',
    text: 'A grimy coffee cup filled with either old coffee grounds or dirt. A sharp chip in its lip menaces the mouth.',
    taken: false,
};
let dirty_spoon = {
    name: 'Greasy Spoon',
    text: 'A greasy spoon.',
    taken: false,
};
let pot_of_gold = {
    name: 'Shiny Pot of Gold',
    text: 'An iron pot filled to the brim with gleaming gold coins.',
    taken: false,
};
let waste_barrel = {
    name: 'Barrel of Sludge',
    text: 'A huge barrel oozing luminescent green slime.',
    taken: false,
};

let goblinbucks = {
    name: 'Goblinbucks Entrance',
    text: "There isn't much in Goblinbucks after hours. Unwashed pails, broken cups, unexplained piles of rags, a drawer full of what appear to be bones - you couldn't sell this stuff if you tried. Wait - what's this? \n\nYou spy a trap door under a filthy straw rug.",
    items: [dirty_cup, dirty_spoon]
};
let basement = {
    name: 'Basement',
    text: 'The basement smells far worse than you had imagined it would. Broken crates pile high on every visible surface.',
    items: []
};
let wine_cellar = {
    name: 'Wine Cellar',
    text: 'In this room, a dozen distended barrels leak sticky red liquid onto the floor, and each other. Fruit flies buzz in clouds over the puddles everywhere. The air is pungent with a sickly-sweet odor that suggests you do not want to try any of this "grape juice".',
    items: []
};
let game_room = {
    name: 'Game Room',
    text: 'The medley of screens and tangled wires in this room would give any system administrator a waking nightmare. The six or seven game systems, although covered in dust and whirring suspiciously, appear to function very well: each one seems to be running a new or classic game title and sports several of its own controllers.',
    items: []
};
let toxic_waste_room = {
    name: 'Toxic Waste Disposal Room',
    text: 'This faintly-glowing green room houses monstrosities that cannot even be described. This must be where the gamers throw their trash! However, something may be hidden behind one of these barrels of sludge...',
    items: [pot_of_gold, waste_barrel]
};

goblinbucks.rooms = [basement];
basement.rooms = [wine_cellar, game_room, goblinbucks];
wine_cellar.rooms = [basement];
game_room.rooms = [basement, toxic_waste_room];
toxic_waste_room.rooms = [game_room];

let currentRoom = goblinbucks;

let inventory = [];

let welcomePrompt = "Welcome to GOBLINBUCKS II!\n" +
"Miffed at your poor treatment at GoblinBucks, you creep back into the abandoned alleyway and sneak into the dirty cafe, under cover of night.\n" + 
"You have heard rumors the goblin may have stolen a pot of gold from a local orphanage, and now is your chance to make things right. \n" +
"The shack is not locked - no one would think to steal from such a wretched establishment.";

function addText(text) {
    let oldText = $output.text();
    $output.text(oldText + "\n" + text);
}

function checkIfGameIsWon(item) {
    if (item.name == pot_of_gold.name) {
        addText("You retrieved the goblin's gold! YOU WIN!");
        $input.off('keyup');
    }
}

function displayCurrentRoom() { 
    if (!currentRoom) {
        currentRoom = goblinbucks;
    }
    addText(currentRoom.name);
    addText(currentRoom.text);

    addText("---");
    addText("Choose an action:");

    currentRoom.rooms.forEach(writeRoomLine);
    currentRoom.items.forEach(writeItemLine);

    if (currentRoom.name == goblinbucks.name) {
        inventory.forEach(checkIfGameIsWon);
    }
}

function writeRoomLine(room, i) {
    addText(i + ". Take door to " + room.name);
}

function writeItemLine(item, i) {
    if (item.taken == false) {
        addText((currentRoom.rooms.length + i) + ". Pick up " + item.name + ": " + item.text);
    }
}

function askForCorrectInput() {
    addText("Please enter a number between 0 and " + (currentRoom.rooms.length + currentRoom.items.length));
}

function readPlayerInput() {
    let chosenNumber = $input.val();
    addText('---');
    addText('You entered: ' + chosenNumber);
    addText('---');

    $input.val("");

    if (isNaN(chosenNumber)) {
        askForCorrectInput();
    } else if (chosenNumber < 0) {
        askForCorrectInput();
    } else if (chosenNumber > (currentRoom.rooms.length + currentRoom.items.length)) {
        askForCorrectInput();
    } else if (chosenNumber >= currentRoom.rooms.length) {
        let itemNumber = chosenNumber - currentRoom.rooms.length;
        let chosenItem = currentRoom.items[itemNumber];
        
        if (chosenItem.taken == true) {
            addText("You can't take an item you already have!");
        } else {
            inventory.push(chosenItem);
            chosenItem.taken = true;
    
            addText("You pick up the " + chosenItem.name + "!");
            addText('---');

            displayCurrentRoom();
        }
    } else {
        currentRoom = currentRoom.rooms[chosenNumber];
        displayCurrentRoom();
    }
}

$input.keyup(function(event) {
    if (event.key == "Enter") {
        readPlayerInput();
    } 
    $input.focus();
    $('body').scrollTop($output.outerHeight(true));
});

addText(welcomePrompt);

displayCurrentRoom();
