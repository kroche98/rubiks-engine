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

class ButtonController {
    placeScrambleButton(cssClasses) {
        const scrambleButton = document.createElement('button');
        for (let cssClass of cssClasses) {
            scrambleButton.classList.add(cssClass);
        }
        scrambleButton.onclick = () => scrambleAndRerender();
        const scrambleButtonText = document.createTextNode('Scramble');
        scrambleButton.appendChild(scrambleButtonText);
        document.getElementById('scramble-button-container').appendChild(scrambleButton);
    }

    placeSolveButton(cssClasses) {
        const solveButton = document.createElement('button');
        for (let cssClass of cssClasses) {
            solveButton.classList.add(cssClass);
        }
        solveButton.onclick = function() {
            document.getElementById('solution-div').textContent = "Solution: computing...";
            const callback = (solution) => document.getElementById('solution-div').textContent = `Solution: ${solution}`;
            puzzle.solve(callback);
        }
        const solveButtonText = document.createTextNode('Solve');
        solveButton.appendChild(solveButtonText);
        document.getElementById('solve-button-container').appendChild(solveButton);
    }

    placePuzzleSelectionButtons(cssClasses, puzzles) {
        for (let i=0; i<puzzles.length; i++) {
            const button = document.createElement('button');
            for (let cssClass of cssClasses) {
                button.classList.add(cssClass);
            }
            button.onclick = () => switchPuzzle(puzzles[i]);
            const buttonText = document.createTextNode(puzzles[i].displayName);
            button.appendChild(buttonText);
            document.getElementById('puzzle-selector-div').appendChild(button);
        }
    }

    updatePuzzleSelectionButtonsState(selection) {
        for (let child of document.getElementById('puzzle-selector-div').children) {
            if (child.textContent == selection) {
                child.classList.add('current-selection');
            } else {
                child.classList.remove('current-selection');
            }
        }
    }

    placeMoveButtons(cssClasses, puzzle) {
        const moveButtonContainer = document.getElementById('move-button-container');
        for (let moveName of Object.keys(puzzle.moveFunctions)) {
            const moveButton = document.createElement('button');
            for (let cssClass of cssClasses) {
                moveButton.classList.add(cssClass);
            }
            moveButton.onclick = () => moveAndRerender(moveName);
            const moveButtonText = document.createTextNode(moveName);
            moveButton.appendChild(moveButtonText);
            moveButtonContainer.appendChild(moveButton);
        }
    }

    clearVariantSpecificButtons() {
        const moveButtonContainer = document.getElementById('move-button-container');
        while (moveButtonContainer.firstChild) {
            moveButtonContainer.removeChild(moveButtonContainer.firstChild);
        }

        const scrambleButtonContainer = document.getElementById('scramble-button-container');
        while (scrambleButtonContainer.firstChild) {
            scrambleButtonContainer.removeChild(scrambleButtonContainer.firstChild);
        }

        const solveButtonContainer = document.getElementById('solve-button-container');
        while (solveButtonContainer.firstChild) {
            solveButtonContainer.removeChild(solveButtonContainer.firstChild);
        }
    }
}

const buttonController = new ButtonController();

function switchPuzzle(puzzleType) {
    puzzle = new puzzleType();

    document.getElementById('solution-div').textContent = '';

    buttonController.clearVariantSpecificButtons();
    buttonController.placeMoveButtons(['plain-button', 'rubiks-move-button'], puzzle);
    if (puzzle.scramble) {
        buttonController.placeScrambleButton(['plain-button']);
    }
    if (puzzle.solve) {
        buttonController.placeSolveButton(['plain-button']);
    }
    buttonController.updatePuzzleSelectionButtonsState(puzzleType.displayName);

    rerender();
}

buttonController.placePuzzleSelectionButtons(['plain-button'], [Puzzle3x3Rubiks, Puzzle2x2Rubiks, Puzzle3x3Cubix])

function main() {
    switchPuzzle(Puzzle3x3Rubiks);
}

main();
