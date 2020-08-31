const CubieType = {
    CORNER: 1,
}

const moves = {
    L: {
        permutation: [[0, 7, 6, 1]],
        rotation: [2, 1, 0, 0, 0, 0, 2, 1],
        inverse: "Li"
    },
    R: {
        permutation: [[2, 5, 4, 3]],
        rotation: [0, 0, 2, 1, 2, 1, 0, 0],
        inverse: "Ri"
    },
    F: {
        permutation: [[0, 3, 4, 7]],
        rotation: [1, 0, 0, 2, 1, 0, 0, 2],
        inverse: "Fi"
    },
    B: {
        permutation: [[1, 6, 5, 2]],
        rotation: [0, 2, 1, 0, 0, 2, 1, 0],
        inverse: "Bi"
    },
    U: {
        permutation: [[0, 1, 2, 3]],
        rotation: [0, 0, 0, 0, 0, 0, 0, 0],
        inverse: "Ui"
    },
    D: {
        permutation: [[4, 5, 6, 7]],
        rotation: [0, 0, 0, 0, 0, 0, 0, 0],
        inverse: "Di"
    },
    Li: {
        permutation: [[0, 1, 6, 7]],
        rotation: [2, 1, 0, 0, 0, 0, 2, 1],
        inverse: "L"
    },
    Ri: {
        permutation: [[2, 3, 4, 5]],
        rotation: [0, 0, 2, 1, 2, 1, 0, 0],
        inverse: "R"
    },
    Fi: {
        permutation: [[0, 7, 4, 3]],
        rotation: [1, 0, 0, 2, 1, 0, 0, 2],
        inverse: "F"
    },
    Bi: {
        permutation: [[1, 2, 5, 6]],
        rotation: [0, 2, 1, 0, 0, 2, 1, 0],
        inverse: "B"
    },
    Ui: {
        permutation: [[0, 3, 2, 1]],
        rotation: [0, 0, 0, 0, 0, 0, 0, 0],
        inverse: "U"
    },
    Di: {
        permutation: [[4, 7, 6, 5]],
        rotation: [0, 0, 0, 0, 0, 0, 0, 0],
        inverse: "D"
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