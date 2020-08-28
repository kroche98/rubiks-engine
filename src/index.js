import { Puzzle3x3Rubiks } from "./puzzles/3x3rubiks-puzzle.js";
import { Puzzle2x2Rubiks } from "./puzzles/2x2rubiks-puzzle.js";
import { Puzzle3x3Cubix } from "./puzzles/3x3cubix-puzzle.js"

let puzzle = new Puzzle3x3Cubix();

const ctx = document.getElementById('canvas').getContext('2d');

function moveAndRerender(moveName) {
    puzzle.applyMove(moveName);
    puzzle.render({ctx});
}

function scrambleAndRerender() {
    puzzle.scramble();
    puzzle.render({ctx});
}

const buttonDiv = document.getElementById('button-div');

for (let moveName of Object.keys(puzzle.moveFunctions)) {
    const button = document.createElement('button');
    button.onclick = () => moveAndRerender(moveName);
    const text = document.createTextNode(moveName);
    button.appendChild(text);
    buttonDiv.appendChild(button);
}

if (puzzle.scramble) {
    const scrambleButton = document.createElement('button');
    scrambleButton.onclick = () => scrambleAndRerender();
    const scrambleButtonText = document.createTextNode('Scramble');
    scrambleButton.appendChild(scrambleButtonText);
    buttonDiv.appendChild(scrambleButton);
}

function main() {
    if (!puzzle.renderer.ready) {
        setTimeout(main, 250);
    } else {
        puzzle.render({ctx});
    }
}

main();
