const CubieType = {
    CORNER: 1,
}

const moves = {
    L: {
        permutation: [[0, 7, 6, 1]],
        rotation: [2, 1, 0, 0, 0, 0, 2, 1]
    },
    R: {
        permutation: [[2, 5, 4, 3]],
        rotation: [0, 0, 2, 1, 2, 1, 0, 0]
    },
    F: {
        permutation: [[0, 3, 4, 7]],
        rotation: [1, 0, 0, 2, 1, 0, 0, 2]
    },
    B: {
        permutation: [[1, 6, 5, 2]],
        rotation: [0, 2, 1, 0, 0, 2, 1, 0]
    },
    U: {
        permutation: [[0, 1, 2, 3]],
        rotation: [0, 0, 0, 0, 0, 0, 0, 0]
    },
    D: {
        permutation: [[4, 5, 6, 7]],
        rotation: [0, 0, 0, 0, 0, 0, 0, 0]
    },
    Li: {
        permutation: [[0, 1, 6, 7]],
        rotation: [2, 1, 0, 0, 0, 0, 2, 1]
    },
    Ri: {
        permutation: [[2, 3, 4, 5]],
        rotation: [0, 0, 2, 1, 2, 1, 0, 0]
    },
    Fi: {
        permutation: [[0, 7, 4, 3]],
        rotation: [1, 0, 0, 2, 1, 0, 0, 2]
    },
    Bi: {
        permutation: [[1, 2, 5, 6]],
        rotation: [0, 2, 1, 0, 0, 2, 1, 0]
    },
    Ui: {
        permutation: [[0, 3, 2, 1]],
        rotation: [0, 0, 0, 0, 0, 0, 0, 0]
    },
    Di: {
        permutation: [[4, 7, 6, 5]],
        rotation: [0, 0, 0, 0, 0, 0, 0, 0]
    },
}

const coordsToCubicle = {
    '0,0,0': 6,
    '1,0,0': 5,
    '0,1,0': 1,
    '1,1,0': 2,
    '0,0,1': 7,
    '1,0,1': 4,
    '0,1,1': 0,
    '1,1,1': 3
};

export { CubieType, moves, coordsToCubicle };