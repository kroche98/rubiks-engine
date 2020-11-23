import { Puzzle3x3Rubiks } from "./puzzles/3x3rubiks-puzzle.js";
import { Puzzle2x2Rubiks } from "./puzzles/2x2rubiks-puzzle.js";
import { Puzzle3x3Cubix } from "./puzzles/3x3cubix-puzzle.js";

let puzzle = new Puzzle3x3Rubiks();

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
    const moveButton = document.createElement('button');
    moveButton.onclick = () => moveAndRerender(moveName);
    const moveButtonText = document.createTextNode(moveName);
    moveButton.appendChild(moveButtonText);
    buttonDiv.appendChild(moveButton);
}

if (puzzle.scramble) {
    const scrambleButton = document.createElement('button');
    scrambleButton.onclick = () => scrambleAndRerender();
    const scrambleButtonText = document.createTextNode('Scramble');
    scrambleButton.appendChild(scrambleButtonText);
    buttonDiv.appendChild(scrambleButton);
}

if (puzzle.solve) {
    const solveButton = document.createElement('button');
    solveButton.onclick = function() {
        document.getElementById('solution-div').textContent = 'Solution: computing...';
        const callback = (solution) => document.getElementById('solution-div').textContent = `Solution: ${solution}`;
        puzzle.solve(callback);
    }
    const solveButtonText = document.createTextNode('Solve');
    solveButton.appendChild(solveButtonText);
    buttonDiv.appendChild(solveButton);
}

function main() {
    if (!puzzle.renderer.ready) {
        setTimeout(main, 250);
    } else {
        puzzle.render({ctx});
    }
}

main();
