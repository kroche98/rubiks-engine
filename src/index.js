import { State, MoveFactory } from "./basic-types.js";
import { cubies, moves, renderer } from "./3x3cubix-data.js";

let state = new State(cubies);

const ctx = document.getElementById('canvas').getContext('2d');

function moveAndRerender(move) {
    state = move(state);
    renderer.renderCube(state, ctx);
}

const moveFactory = new MoveFactory();

const moveFunctions = {};

for (let [name, move] of Object.entries(moves)) {
    const moveFunction = moveFactory.getMoveFunction(move);
    moveFunctions[name] = moveFunction;
    const buttonDiv = document.getElementById('button-div');
    const button = document.createElement('button');
    button.onclick = () => moveAndRerender(moveFunction);
    const text = document.createTextNode(name);
    button.appendChild(text);
    buttonDiv.appendChild(button);
}

function main() {
    if (!renderer.ready) {
        setTimeout(main, 250);
    } else {
        renderer.renderCube(state, ctx);
    }
}

main();
