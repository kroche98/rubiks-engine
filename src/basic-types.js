import { cloneDeep, range } from 'lodash-es'
import { permute } from 'lodash-permute'

class Cubie {
    constructor(type, name, orientation, symmetry) {
        this.type = type;
        this.name = name;
        this.orientation = orientation;
        this.symmetry = symmetry;
    }
}

class State {
    constructor(cubies) {
        this.cubies = cubies;
    }
}

class MoveFactory {
    static toRosterNotation(cycleNotation, numElements) {
        let rosterNotation = range(numElements);
        for (let cycle of cycleNotation) {
            for (let i = 0; i < cycle.length; i++) {
                rosterNotation[cycle[i]] = cycle[i-1];
            }
            rosterNotation[cycle[0]] = cycle[cycle.length - 1];
        }
        return rosterNotation;
    }
    
    static getMoveFunction(move) {
        return function(state, saveCurrentState) {
            let newState = saveCurrentState ? cloneDeep(state) : state;
            let rosterNotation = MoveFactory.toRosterNotation(move.permutation, state.cubies.length);
            newState.cubies = permute(newState.cubies, rosterNotation);
            newState.cubies.forEach((c, i) => c.orientation = (c.orientation + move.rotation[i]) % c.symmetry);
            return newState;
        }
    }    
}

class Puzzle {
    constructor(moves, renderer, solvedState, state) {
        this.moveFunctions = {};
        for (let [name, move] of Object.entries(moves)) {
            const moveFunction = MoveFactory.getMoveFunction(move);
            this.moveFunctions[name] = moveFunction;
        }
        this.renderer = renderer;
        this.solvedState = solvedState;
        if (state) {
            this.state = cloneDeep(state);
        } else {
            this.state = cloneDeep(solvedState);
        }
    }

    applyMove(moveName, saveCurrentState) {
        const moveFunction = this.moveFunctions[moveName];
        this.state = moveFunction(this.state, saveCurrentState);
    }

    render(args) {
        if (this.renderer) {
            this.renderer.render(this.state, args);
        }
    }
}

export { Cubie, State, MoveFactory, Puzzle };
