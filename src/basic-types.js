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

class Cube {
    constructor(solvedState, state) {
        this.solvedState = solvedState;
        if (state) {
            this.state = state;
        } else {
            this.state = cloneDeep(solvedState);
        }
    }
}

class MoveFactory {
    toRosterNotation(cycleNotation, numElements) {
        let rosterNotation = range(numElements);
        for (let cycle of cycleNotation) {
            for (let i = 0; i < cycle.length; i++) {
                rosterNotation[cycle[i]] = cycle[i-1];
            }
            rosterNotation[cycle[0]] = cycle[cycle.length - 1];
        }
        return rosterNotation;
    }
    
    getMoveFunction(move) {
        return function(state, saveCurrentState) {
            let newState = saveCurrentState ? cloneDeep(state) : state;
            let rosterNotation = toRosterNotation(move.permutation, state.cubies.length);
            newState.cubies = permute(newState.cubies, rosterNotation);
            newState.cubies.forEach((c, i) => c.orientation = (c.orientation + move.rotation[i]) % c.symmetry);
            return newState;
        }
    }    
}

export { Cubie, State, Cube, MoveFactory };
