let $output = $('#output');
let $input = $('#input');

let goblinbucks = {
    name: 'Goblinbucks',
    text: "There isn't much in Goblinbucks after hours. Unwashed pails, broken cups, unexplained piles of rags, a drawer full of what appear to be bones - you couldn't sell this stuff if you tried. Wait - what's this? \n\nYou spy a trap door under a filthy straw rug. Enter?",
};
let basement = {
    name: 'Basement',
    text: 'The basement smells far worse than you had imagined it would. Broken crates pile high on every visible surface.',
};
let wine_cellar = {
    name: 'Wine Cellar',
    text: 'In this room, a dozen distended barrels leak sticky red liquid onto the floor, and each other. Fruit flies buzz in clouds over the puddles everywhere. The air is pungent with a sickly-sweet odor that suggests you do not want to try any of this "grape juice".',
};
let game_room = {
    name: 'Game Room',
    text: 'The medley of screens and tangled wires in this room would give any system administrator a waking nightmare. The six or seven game systems, although covered in dust and whirring suspiciously, appear to function very well: each one seems to be running a new or classic game title and sports several of its own controllers.',
};

goblinbucks.rooms = [basement];
basement.rooms = [wine_cellar, game_room, goblinbucks];
wine_cellar.rooms = [basement];
game_room.rooms = [basement];

let currentRoom = goblinbucks;

let welcomePrompt = "Welcome to GOBLINBUCKS II!\n" +
"Miffed at your poor treatment at GoblinBucks, you creep back into the abandoned alleyway and sneak into the dirty cafe, under cover of night.\n" + 
"You have heard rumors the goblin may have stolen a pot of gold from a local orphanage, and now is your chance to make things right. \n" +
"The shack is not locked - no one would think to steal from such a wretched establishment.";

function addText(text) {
    let oldText = $output.text();
    $output.text(oldText + "\n" + text);
}

function displayCurrentRoom() { 
    if (!currentRoom) {
        currentRoom = goblinbucks;
    }
    addText(currentRoom.name);
    addText(currentRoom.text);
    addText("---");
    addText("Choose a door:");

    currentRoom.rooms.forEach(writeRoomLine)
}

function writeRoomLine(room, i) {
    addText(i + ". " + room.name);
}

function readPlayerInput() {
    let chosenRoomNumber = $input.val();
    addText('---');
    addText('You entered: ' + chosenRoomNumber);
    addText('---');

    $input.val("");

    if (isNaN(chosenRoomNumber)) {
        addText("Please enter a number between 0 and " + currentRoom.rooms.length);
    } else if (chosenRoomNumber >= currentRoom.rooms.length) {
        addText("Please enter a number between 0 and " + currentRoom.rooms.length);
    } else if (chosenRoomNumber < 0) {
        addText("Please enter a number between 0 and " + currentRoom.rooms.length);
    } else {
        currentRoom = currentRoom.rooms[chosenRoomNumber];
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
