import { Puzzle3x3Rubiks } from "./puzzles/3x3rubiks-puzzle.js";
import { Puzzle2x2Rubiks } from "./puzzles/2x2rubiks-puzzle.js";
import { Puzzle3x3Cubix } from "./puzzles/3x3cubix-puzzle.js";

let puzzle = null;

const ctx = document.getElementById('canvas').getContext('2d');

function rerender() {
    if (!puzzle.renderer.ready) {
        setTimeout(rerender, 100);
    } else {
        puzzle.render({ctx});
    }
}

function moveAndRerender(moveName) {
    puzzle.applyMove(moveName);
    rerender();
}

function scrambleAndRerender() {
    puzzle.scramble();
    rerender();
}

function switchPuzzle(puzzleType) {
    puzzle = new puzzleType();

    document.getElementById('solution-div').textContent = '';

    const buttonDiv = document.getElementById('button-div');

    while (buttonDiv.firstChild) {
        buttonDiv.removeChild(buttonDiv.firstChild);
    }
    
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

    rerender();
}

const puzzleSelectorDiv = document.getElementById('puzzle-selector-div');

const button3x3Rubiks = document.createElement('button');
button3x3Rubiks.onclick = () => switchPuzzle(Puzzle3x3Rubiks);
const button3x3RubiksText = document.createTextNode("3x3 Rubiks Cube");
button3x3Rubiks.appendChild(button3x3RubiksText);
puzzleSelectorDiv.appendChild(button3x3Rubiks);

const button2x2Rubiks = document.createElement('button');
button2x2Rubiks.onclick = () => switchPuzzle(Puzzle2x2Rubiks);
const button2x2RubiksText = document.createTextNode("2x2 Rubiks Cube");
button2x2Rubiks.appendChild(button2x2RubiksText);
puzzleSelectorDiv.appendChild(button2x2Rubiks);

const button3x3Cubix = document.createElement('button');
button3x3Cubix.onclick = () => switchPuzzle(Puzzle3x3Cubix);
const button3x3CubixText = document.createTextNode("3x3 Cubix Tube");
button3x3Cubix.appendChild(button3x3CubixText);
puzzleSelectorDiv.appendChild(button3x3Cubix);

function main() {
    switchPuzzle(Puzzle3x3Rubiks);
}

main();
