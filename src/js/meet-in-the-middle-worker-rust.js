function stateToArray(state) {
    const cubieNames = ['ufl', 'ulb', 'ubr', 'urf', 'dfr', 'drb', 'dbl', 'dlf'];
    let arr = [];
    for (let cubie of state.cubies) {
        arr.push(cubieNames.indexOf(cubie.name));
        arr.push(cubie.orientation);
    }
    arr = new Uint8Array(arr);
    return arr;
}

function toMoveNames(moveSeq) {
    const moveNames = ['blah', 'L', 'R', 'F', 'B', 'U', 'D', 'Li', 'Ri', 'Fi', 'Bi', 'Ui', 'Di', 'L2', 'R2', 'F2', 'B2', 'U2', 'D2'];
    return Array.from(moveSeq).map(move => moveNames[move]);
}

onmessage = function({ data: { leftState, rightState, moves }}) {
    import('../rust/pkg/').then((solver) => {
        leftState = stateToArray(leftState);
        rightState = stateToArray(rightState);
        let solution = solver.solve(leftState, rightState);
        postMessage(toMoveNames(solution));
    });
};
