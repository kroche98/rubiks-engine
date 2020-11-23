import { MoveFactory } from "./basic-types.js";
import { mapValues, reverse, cloneDeep } from "lodash-es"

class MitmSolver {
    constructor(leftState, rightState, moves) {
        this.leftState = cloneDeep(leftState);
        this.rightState = cloneDeep(rightState);
        this.moveFunctions = mapValues(moves, move => MoveFactory.getMoveFunction(move));
        this.moveInverses = mapValues(moves, move => move.inverse);
        this.leftReachedStates = {};
        this.rightReachedStates = {};
        this.leftReachedStates[MitmSolver.stateToString(leftState)] = {state: leftState, seq: []};
        this.rightReachedStates[MitmSolver.stateToString(rightState)] = {state: rightState, seq: []};
    }

    static stateToString(state) {
        return state.cubies.map(cubie => `${cubie.name} ${cubie.orientation}`).join();
    }
    
    increaseDepth(reachedStates) {
        for (let {state, seq} of Object.values(reachedStates)) {
            for (let [moveName, moveFunction] of Object.entries(this.moveFunctions)) {
                let tempState = moveFunction(state, true);
                if (!(MitmSolver.stateToString(tempState) in reachedStates)) {
                    reachedStates[MitmSolver.stateToString(tempState)] = {
                        state: tempState,
                        seq: seq.concat([moveName]),
                    };
                }
            }
        }
    }

    findSolution() {
        let solutionFound = false;
        let middleState = null;

        if (MitmSolver.stateToString(this.leftState) === MitmSolver.stateToString(this.rightState)) {
            solutionFound = true;
            middleState = MitmSolver.stateToString(this.leftState);
        }

        let reachedStates = this.leftReachedStates;
        let otherReachedStates = this.rightReachedStates;

        while (!solutionFound) {
            this.increaseDepth(reachedStates);

            for (let state of Object.keys(reachedStates)) {
                if (state in otherReachedStates) {
                    solutionFound = true;
                    middleState = state;
                    break;
                }
            }

            [reachedStates, otherReachedStates] = [otherReachedStates, reachedStates];
        }

        const leftSolutionSeq = this.leftReachedStates[middleState].seq;
        const rightSolutionSeq = reverse(this.rightReachedStates[middleState].seq.map(m => this.moveInverses[m]));
        const solutionSeq = leftSolutionSeq.concat(rightSolutionSeq);
        return solutionSeq;
    }
}

export { MitmSolver }
